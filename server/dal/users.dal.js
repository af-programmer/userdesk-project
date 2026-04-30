const pool = require('../db');

exports.createUser = async ({ username, email, password }) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const [result] = await conn.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    await conn.query(
      'INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)',
      [result.insertId, password]
    );
    await conn.commit();
    return result.insertId;
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};

exports.getUserByUsername = async (username) => {
  const [rows] = await pool.query(
    'SELECT users.*, passwords.password_hash FROM users JOIN passwords ON users.id = passwords.user_id WHERE users.username = ?',
    [username]
  );
  return rows[0];
};

exports.getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, username, email, created_at FROM users WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, username, email, created_at FROM users');
  return rows;
};

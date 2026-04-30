const pool = require('../db');

exports.createUser = async ({ username, email, password }) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [result] = await connection.query(
      'INSERT INTO users (username, email) VALUES (?, ?)',
      [username, email]
    );
    await connection.query(
      'INSERT INTO passwords (user_id, password_hash) VALUES (?, ?)',
      [result.insertId, password]
    );
    await connection.commit();
    return result.insertId;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

exports.getUserByUsername = async (username) => {
  const [rows] = await pool.query(
    'SELECT users.*, passwords.password_hash FROM users JOIN passwords ON users.id = passwords.user_id WHERE users.username = ?',
    [username]
  );
  if (!rows.length) return null;
  return rows[0];
};

exports.getUserById = async (id) => {
  const [rows] = await pool.query(
    'SELECT id, username, email, created_at FROM users WHERE id = ?',
    [id]
  );
  if (!rows.length) return null;
  return rows[0];
};

//not shooroe if this route is needed or not, but just in case we will add it, and only admin can access it
exports.getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, username, email, created_at FROM users');
  return rows;
};

const pool = require('../db');

exports.createUser = async ({ username, email, password }) => {
  const [result] = await pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  return result.insertId;
};

exports.getUserByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.getUserById = async (id) => {
  const [rows] = await pool.query('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.getAllUsers = async () => {
  const [rows] = await pool.query('SELECT id, username, email, created_at FROM users');
  return rows;
};

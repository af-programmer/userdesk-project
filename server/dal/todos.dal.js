import pool from '../db.js';

export const getTodosByUserId = async (userId, filters = {}) => {
  let query = 'SELECT * FROM todos WHERE user_id = ?';
  const params = [userId];
  if (filters.completed !== undefined) {
    query += ' AND completed = ?';
    params.push(filters.completed);
  }
  query += ' ORDER BY id';
  const [rows] = await pool.query(query, params);
  return rows;
};

export const getTodoById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM todos WHERE id = ?', [id]);
  return rows[0];
};

export const createTodo = async ({ user_id, title }) => {
  const [result] = await pool.query(
    'INSERT INTO todos (user_id, title) VALUES (?, ?)',
    [user_id, title]
  );
  return result.insertId;
};

export const updateTodo = async (id, { title, completed }) => {
  const [result] = await pool.query(
    'UPDATE todos SET title = COALESCE(?, title), completed = COALESCE(?, completed) WHERE id = ?',
    [title, completed, id]
  );
  return result.affectedRows;
};

export const deleteTodo = async (id) => {
  const [result] = await pool.query('DELETE FROM todos WHERE id = ?', [id]);
  return result.affectedRows;
};
  
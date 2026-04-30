import pool from '../db.js';

export const getCommentsByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.created_at ASC',
    [postId]
  );
  return rows;
};

export const getCommentById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
  return rows[0];
};

export const createComment = async ({ post_id, user_id, content }) => {
  const [result] = await pool.query(
    'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
    [post_id, user_id, content]
  );
  return result.insertId;
};

export const updateComment = async (id, content) => {
  const [result] = await pool.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
  return result.affectedRows;
};

export const deleteComment = async (id) => {
  const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);
  return result.affectedRows;
};

const pool = require('../db');

exports.getCommentsByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.created_at ASC',
    [postId]
  );
  return rows;
};

exports.getCommentById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
  return rows[0];
};

exports.createComment = async ({ post_id, user_id, content }) => {
  const [result] = await pool.query(
    'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
    [post_id, user_id, content]
  );
  return result.insertId;
};

exports.updateComment = async (id, content) => {
  const [result] = await pool.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
  return result.affectedRows;
};

exports.deleteComment = async (id) => {
  const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);
  return result.affectedRows;
};

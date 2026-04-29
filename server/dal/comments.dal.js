const pool = require('../db');

exports.getCommentsByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.created_at ASC',
    [postId]
  );
  return rows;
};

exports.createComment = async ({ post_id, user_id, content }) => {
  const [result] = await pool.query(
    'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
    [post_id, user_id, content]
  );
  return result.insertId;
};

exports.deleteComment = async (id) => {
  const [result] = await pool.query('DELETE FROM comments WHERE id = ?', [id]);
  return result.affectedRows;
};

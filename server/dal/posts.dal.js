const pool = require('../db');

exports.getAllPosts = async (includeComments = false) => {
  const [posts] = await pool.query(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.id'
  );
  if (!includeComments) return posts;
  for (const post of posts) {
    const [comments] = await pool.query(
      'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ? ORDER BY comments.id',
      [post.id]
    );
    post.comments = comments;
  }
  return posts;
};

exports.getPostById = async (id) => {
  const [rows] = await pool.query(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ?',
    [id]
  );
  return rows[0];
};

exports.createPost = async ({ user_id, title, content }) => {
  const [result] = await pool.query(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [user_id, title, content]
  );
  return result.insertId;
};

exports.updatePost = async (id, { title, content }) => {
  const [result] = await pool.query(
    'UPDATE posts SET title = COALESCE(?, title), content = COALESCE(?, content) WHERE id = ?',
    [title, content, id]
  );
  return result.affectedRows;
};

exports.deletePost = async (id) => {
  const [result] = await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  return result.affectedRows;
};

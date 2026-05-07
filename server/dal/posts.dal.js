import pool from '../db.js';
import { getById, deleteRecord, updateRecord, createRecord } from './base.dal.js';

export const getAllPosts = async (includeComments = false) => {
  const [posts] = await pool.query(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.is_deleted = 0 ORDER BY posts.id'
  );
  if (!includeComments) return posts;
  for (const post of posts) {
    const [comments] = await pool.query(
      'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ? AND comments.is_deleted = 0 ORDER BY comments.id',
      [post.id]
    );
    post.comments = comments;
  }
  return posts;
};

export const getPostById = async (id) => {
  const [rows] = await pool.query(
    'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id WHERE posts.id = ? AND posts.is_deleted = 0',
    [id]
  );
  return rows[0];
};

export const createPost = async ({ user_id, title, content }) => {
  return createRecord('posts', { user_id, title, content });
};

export const updatePost = async (id, { title, content }) => {
  return updateRecord('posts', id, { title, content });
};

export const deletePost = async (id) => {
  return deleteRecord('posts', id);
};

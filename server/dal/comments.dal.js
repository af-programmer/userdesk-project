import pool from '../db.js';
import { getById, deleteRecord, updateRecord, createRecord } from './base.dal.js';

export const getCommentsByPostId = async (postId) => {
  const [rows] = await pool.query(
    'SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ORDER BY comments.created_at ASC',
    [postId]
  );
  return rows;
};

export const getCommentById = async (id) => {
  return getById('comments', id);
};

export const createComment = async ({ post_id, user_id, content }) => {
  return createRecord('comments', { post_id, user_id, content });
};

export const updateComment = async (id, content) => {
  return updateRecord('comments', id, { content });
};

export const deleteComment = async (id) => {
  return deleteRecord('comments', id);
};

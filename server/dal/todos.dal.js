import pool from '../db.js';
import { getById, deleteRecord, updateRecord, createRecord } from './base.dal.js';

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
  return getById('todos', id);
};

export const createTodo = async ({ user_id, title }) => {
  return createRecord('todos', { user_id, title });
};

export const updateTodo = async (id, { title, completed }) => {
  return updateRecord('todos', id, { title, completed });
};

export const deleteTodo = async (id) => {
  return deleteRecord('todos', id);
};
  
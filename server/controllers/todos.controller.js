import * as todosDAL from '../dal/todos.dal.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllTodos = asyncHandler(async (req, res) => {
  const filters = {};
  if (req.query.completed !== undefined)
    filters.completed = req.query.completed === 'true' ? 1 : 0;
  const todos = await todosDAL.getTodosByUserId(req.user.id, filters);
  res.json(todos);
});

export const getTodoById = asyncHandler(async (req, res) => {
  const todo = await todosDAL.getTodoById(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

export const createTodo = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const todoId = await todosDAL.createTodo({ user_id: req.user.id, title });
  res.status(201).json({ id: todoId, message: 'Todo created successfully' });
});

export const updateTodo = asyncHandler(async (req, res) => {
  const todo = await todosDAL.getTodoById(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (todo.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await todosDAL.updateTodo(req.params.id, req.body);
  res.json({ message: 'Todo updated successfully' });
});

export const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await todosDAL.getTodoById(req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (todo.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await todosDAL.deleteTodo(req.params.id);
  res.json({ message: 'Todo deleted successfully' });
});

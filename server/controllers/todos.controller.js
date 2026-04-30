import * as todosDAL from '../dal/todos.dal.js';

export const getAllTodos = async (req, res) => {
  try {
    const filters = {};
    if (req.query.completed !== undefined)
      filters.completed = req.query.completed === 'true' ? 1 : 0;
    const todos = await todosDAL.getTodosByUserId(req.user.id, filters);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await todosDAL.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const todoId = await todosDAL.createTodo({ user_id: req.user.id, title });
    res.status(201).json({ id: todoId, message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await todosDAL.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    if (todo.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await todosDAL.updateTodo(req.params.id, req.body);
    res.json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await todosDAL.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    if (todo.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
    await todosDAL.deleteTodo(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

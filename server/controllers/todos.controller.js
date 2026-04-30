const todosDAL = require('../dal/todos.dal');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await todosDAL.getTodosByUserId(req.user.id);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const todo = await todosDAL.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const todoId = await todosDAL.createTodo({ user_id: req.user.id, title });
    res.status(201).json({ id: todoId, message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTodo = async (req, res) => {
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

exports.deleteTodo = async (req, res) => {
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

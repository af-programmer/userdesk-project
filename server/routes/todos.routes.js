const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', auth, todosController.getAllTodos);
router.get('/:id', auth, todosController.getTodoById);
router.post('/', auth, todosController.createTodo);
router.put('/:id', auth, todosController.updateTodo);
router.delete('/:id', auth, todosController.deleteTodo);

module.exports = router;

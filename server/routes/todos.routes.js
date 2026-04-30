import express from 'express';
import * as todosController from '../controllers/todos.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', auth, todosController.getAllTodos);
router.get('/:id', auth, todosController.getTodoById);
router.post('/', auth, todosController.createTodo);
router.put('/:id', auth, todosController.updateTodo);
router.delete('/:id', auth, todosController.deleteTodo);

export default router;

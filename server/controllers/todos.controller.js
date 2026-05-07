import * as todosDAL from '../dal/todos.dal.js';
import { createController } from '../utils/controllerFactory.js';

const controller = createController({
  getByUserId: todosDAL.getTodosByUserId,
  getById: todosDAL.getTodoById,
  create: todosDAL.createTodo,
  update: todosDAL.updateTodo,
  remove: todosDAL.deleteTodo
}, 'Todo');

export const getAllTodos = controller.getAll;
export const getTodoById = controller.getById;
export const createTodo = controller.create;
export const updateTodo = controller.update;
export const deleteTodo = controller.remove;

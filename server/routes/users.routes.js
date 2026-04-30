import express from 'express';
import * as usersController from '../controllers/users.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/:id', auth, usersController.getUserById);
router.get('/', auth, usersController.getAllUsers);//just admin can access this route

export default router;

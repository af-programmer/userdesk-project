const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const auth = require('../middleware/auth.middleware');

router.post('/register', usersController.register);
router.post('/login', usersController.login);
router.get('/:id', auth, usersController.getUserById);
router.get('/', auth, usersController.getAllUsers);//just admin can access this route

module.exports = router;

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersDAL from '../dal/users.dal.js';
import asyncHandler from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await usersDAL.createUser({ username, email, password: hashedPassword });
  res.status(201).json({ id: userId, message: 'User created successfully' });
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await usersDAL.getUserByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '24h' });
  res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await usersDAL.getUserById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});
// not shooroe if this route is needed or not, but just in case we will add it, and only admin can access it
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await usersDAL.getAllUsers();
  res.json(users);
});

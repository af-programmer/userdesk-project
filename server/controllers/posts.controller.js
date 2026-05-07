import * as postsDAL from '../dal/posts.dal.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await postsDAL.getAllPosts(req.query.include === 'comments');
  res.json(posts);
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await postsDAL.getPostById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

export const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });
  const postId = await postsDAL.createPost({ user_id: req.user.id, title, content });
  res.status(201).json({ id: postId, message: 'Post created successfully' });
});

export const updatePost = asyncHandler(async (req, res) => {
  const post = await postsDAL.getPostById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await postsDAL.updatePost(req.params.id, req.body);
  res.json({ message: 'Post updated successfully' });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await postsDAL.getPostById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  if (post.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await postsDAL.deletePost(req.params.id);
  res.json({ message: 'Post deleted successfully' });
});

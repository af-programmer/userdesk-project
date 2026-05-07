import * as commentsDAL from '../dal/comments.dal.js';
import asyncHandler from '../utils/asyncHandler.js';

export const getCommentsByPost = asyncHandler(async (req, res) => {
  const comments = await commentsDAL.getCommentsByPostId(req.params.postId);
  res.json(comments);
});

export const createComment = asyncHandler(async (req, res) => {
  const { post_id, content } = req.body;
  if (!content || !post_id) return res.status(400).json({ error: 'content and post_id are required' });
  const commentId = await commentsDAL.createComment({ post_id, user_id: req.user.id, content });
  res.status(201).json({ id: commentId, message: 'Comment created successfully' });
});

export const updateComment = asyncHandler(async (req, res) => {
  const comment = await commentsDAL.getCommentById(req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  if (comment.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await commentsDAL.updateComment(req.params.id, req.body.content);
  res.json({ message: 'Comment updated successfully' });
});

export const deleteComment = asyncHandler(async (req, res) => {
  const comment = await commentsDAL.getCommentById(req.params.id);
  if (!comment) return res.status(404).json({ error: 'Comment not found' });
  if (comment.user_id !== req.user.id) return res.status(403).json({ error: 'Forbidden' });
  await commentsDAL.deleteComment(req.params.id);
  res.json({ message: 'Comment deleted successfully' });
});

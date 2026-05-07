import * as commentsDAL from '../dal/comments.dal.js';
import { createController } from '../utils/controllerFactory.js';
import asyncHandler from '../utils/asyncHandler.js';

const controller = createController({
  getById: commentsDAL.getCommentById,
  create: commentsDAL.createComment,
  update: commentsDAL.updateComment,
  remove: commentsDAL.deleteComment
}, 'Comment');

export const getCommentsByPost = asyncHandler(async (req, res) => {
  const comments = await commentsDAL.getCommentsByPostId(req.params.postId);
  res.json(comments);
});

export const createComment = controller.create;
export const updateComment = controller.update;
export const deleteComment = controller.remove;

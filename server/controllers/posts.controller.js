import * as postsDAL from '../dal/posts.dal.js';
import { createController } from '../utils/controllerFactory.js';
import asyncHandler from '../utils/asyncHandler.js';

const controller = createController({
  getById: postsDAL.getPostById,
  create: postsDAL.createPost,
  update: postsDAL.updatePost,
  delete: postsDAL.deletePost
}, 'Post', {
  customGetAll: asyncHandler(async (req, res) => {
    const posts = await postsDAL.getAllPosts(req.query.include === 'comments');
    res.json(posts);
  })
});

export const getAllPosts = controller.getAll;
export const getPostById = controller.getById;
export const createPost = controller.create;
export const updatePost = controller.update;
export const deletePost = controller.delete;

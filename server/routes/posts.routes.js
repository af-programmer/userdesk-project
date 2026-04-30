import express from 'express';
import * as postsController from '../controllers/posts.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', auth, postsController.createPost);
router.put('/:id', auth, postsController.updatePost);
router.delete('/:id', auth, postsController.deletePost);

export default router;

import express from 'express';
import * as commentsController from '../controllers/comments.controller.js';
import auth from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/post/:postId', commentsController.getCommentsByPost);
router.post('/', auth, commentsController.createComment);
router.put('/:id', auth, commentsController.updateComment);
router.delete('/:id', auth, commentsController.deleteComment);

export default router;

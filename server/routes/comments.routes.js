const express = require('express');
const router = express.Router();
const commentsController = require('../controllers/comments.controller');
const auth = require('../middleware/auth.middleware');

router.get('/post/:postId', commentsController.getCommentsByPost);
router.post('/', auth, commentsController.createComment);
router.delete('/:id', auth, commentsController.deleteComment);

module.exports = router;

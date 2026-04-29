const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts.controller');
const auth = require('../middleware/auth.middleware');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', auth, postsController.createPost);
router.put('/:id', auth, postsController.updatePost);
router.delete('/:id', auth, postsController.deletePost);

module.exports = router;

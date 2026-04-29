const commentsDAL = require('../dal/comments.dal');

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await commentsDAL.getCommentsByPostId(req.params.postId);
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const { post_id, content } = req.body;
    const commentId = await commentsDAL.createComment({ post_id, user_id: req.user.id, content });
    res.status(201).json({ id: commentId, message: 'Comment created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    await commentsDAL.deleteComment(req.params.id);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

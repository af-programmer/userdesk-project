import { useState, useEffect } from 'react';
import { getComments, createComment } from '../services/api';

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    const data = await getComments(postId);
    setComments(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment({ post_id: postId, content: newComment });
    setNewComment('');
    loadComments();
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <small>By {comment.username}</small>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CommentList;

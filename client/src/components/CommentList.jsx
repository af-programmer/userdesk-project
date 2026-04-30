import { useState, useEffect } from 'react';
import { getComments, createComment, updateComment, deleteComment } from '../services/api';

function CommentList({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => { loadComments(); }, [postId]);

  const loadComments = async () => setComments(await getComments(postId));

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment({ post_id: postId, content: newComment });
    setNewComment('');
    loadComments();
  };

  const handleUpdate = async (id) => {
    await updateComment(id, { content: editContent });
    setEditingId(null);
    loadComments();
  };

  const handleDelete = async (id) => {
    await deleteComment(id);
    loadComments();
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment.id}>
          {editingId === comment.id ? (
            <>
              <input value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <button onClick={() => handleUpdate(comment.id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <small>By {comment.username}</small>
              {currentUser?.id === comment.user_id && (
                <>
                  <button onClick={() => { setEditingId(comment.id); setEditContent(comment.content); }}>Edit</button>
                  <button onClick={() => handleDelete(comment.id)}>Delete</button>
                </>
              )}
            </>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CommentList;

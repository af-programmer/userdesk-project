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

  const handleUpdate = async (id) => { await updateComment(id, { content: editContent }); setEditingId(null); loadComments(); };
  const handleDelete = async (id) => { await deleteComment(id); loadComments(); };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment.id} className="comment-item">
          {editingId === comment.id ? (
            <div className="d-flex gap-2">
              <input className="form-input flex-1" value={editContent} onChange={(e) => setEditContent(e.target.value)} />
              <button className="btn btn-primary" onClick={() => handleUpdate(comment.id)}>Save</button>
              <button className="btn btn-secondary" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <p>{comment.content}</p>
              <div className="d-flex align-items-center gap-2 mt-1">
                <small>By {comment.username}</small>
                {currentUser?.id === comment.user_id && (
                  <>
                    <button className="btn btn-sm btn-secondary" onClick={() => { setEditingId(comment.id); setEditContent(comment.content); }}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(comment.id)}>Delete</button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      <form className="inline mt-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit" className="btn btn-primary">Post</button>
      </form>
    </div>
  );
}

export default CommentList;

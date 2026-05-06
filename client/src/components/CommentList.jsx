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
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={editContent} onChange={(e) => setEditContent(e.target.value)} style={{ flex: 1 }} />
              <button onClick={() => handleUpdate(comment.id)}>Save</button>
              <button className="btn-ghost" onClick={() => setEditingId(null)}>Cancel</button>
            </div>
          ) : (
            <>
              <p>{comment.content}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <small>By {comment.username}</small>
                {currentUser?.id === comment.user_id && (
                  <>
                    <button className="btn-ghost" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => { setEditingId(comment.id); setEditContent(comment.content); }}>Edit</button>
                    <button className="btn-danger" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => handleDelete(comment.id)}>Delete</button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      <form className="inline" onSubmit={handleSubmit} style={{ marginTop: 12 }}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CommentList;

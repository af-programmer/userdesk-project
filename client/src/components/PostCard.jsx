import { useState } from 'react';
import CommentList from './CommentList';

function PostCard({ post, currentUser, onUpdate, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: post.title, content: post.content });
  const isOwner = currentUser?.id === post.user_id;

  const handleSave = () => { onUpdate(post.id, form.title, form.content); setEditing(false); };

  return (
    <div className="card">
      {editing ? (
        <>
          <input className="form-input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="form-textarea mt-2" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={3} />
          <div className="card-actions">
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p className="mb-2">{post.content}</p>
          <small>By {post.username}</small>
          <div className="card-actions">
            {isOwner && (
              <>
                <button className="btn btn-secondary" onClick={() => setEditing(true)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(post.id)}>Delete</button>
              </>
            )}
            <button className="btn btn-secondary" onClick={() => setShowComments(!showComments)}>
              {showComments ? 'Hide Comments' : 'Comments'}
            </button>
          </div>
        </>
      )}
      {showComments && (
        <div className="comments-section">
          <CommentList postId={post.id} currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}

export default PostCard;

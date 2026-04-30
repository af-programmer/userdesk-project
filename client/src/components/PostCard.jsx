import { useState } from 'react';
import CommentList from './CommentList';

function PostCard({ post, currentUser, onUpdate, onDelete }) {
  const [showComments, setShowComments] = useState(false);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: post.title, content: post.content });
  const isOwner = currentUser?.id === post.user_id;

  const handleSave = () => {
    onUpdate(post.id, form.title, form.content);
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <small>By {post.username}</small>
          {isOwner && (
            <>
              <button onClick={() => setEditing(true)}>Edit</button>
              <button onClick={() => onDelete(post.id)}>Delete</button>
            </>
          )}
        </>
      )}
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && <CommentList postId={post.id} currentUser={currentUser} />}
    </div>
  );
}

export default PostCard;

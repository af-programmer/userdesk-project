import { useState } from 'react';
import CommentList from './CommentList';

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <small>By {post.username}</small>
      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;

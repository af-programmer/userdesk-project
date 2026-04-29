import { useState, useEffect } from 'react';
import { getPosts } from '../services/api';
import PostCard from '../components/PostCard';

function PostsPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default PostsPage;

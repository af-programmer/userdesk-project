import { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from '../services/api';
import PostCard from '../components/PostCard';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => setPosts(await getPosts());

  const handleCreate = async (e) => {
    e.preventDefault();
    await createPost(form);
    setForm({ title: '', content: '' });
    loadPosts();
  };

  const handleUpdate = async (id, title, content) => {
    await updatePost(id, { title, content });
    loadPosts();
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    loadPosts();
  };

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        />
        <button type="submit">Add Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUser={currentUser}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default PostsPage;

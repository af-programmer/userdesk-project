const API_URL = 'http://localhost:3000/api';

const getToken = () => localStorage.getItem('token');

const fetchAPI = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const response = await fetch(`${API_URL}${url}`, { ...options, headers });
  if (!response.ok) throw new Error('Request failed');
  return response.json();
};

export const login = (data) => fetchAPI('/users/login', { method: 'POST', body: JSON.stringify(data) });

export const getTodos = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/todos${query ? '?' + query : ''}`);
};
export const createTodo = (data) => fetchAPI('/todos', { method: 'POST', body: JSON.stringify(data) });
export const updateTodo = (id, data) => fetchAPI(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTodo = (id) => fetchAPI(`/todos/${id}`, { method: 'DELETE' });

export const getPosts = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchAPI(`/posts${query ? '?' + query : ''}`);
};
export const createPost = (data) => fetchAPI('/posts', { method: 'POST', body: JSON.stringify(data) });
export const updatePost = (id, data) => fetchAPI(`/posts/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deletePost = (id) => fetchAPI(`/posts/${id}`, { method: 'DELETE' });

export const getComments = (postId) => fetchAPI(`/comments/post/${postId}`);
export const createComment = (data) => fetchAPI('/comments', { method: 'POST', body: JSON.stringify(data) });
export const updateComment = (id, data) => fetchAPI(`/comments/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteComment = (id) => fetchAPI(`/comments/${id}`, { method: 'DELETE' });

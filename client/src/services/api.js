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
export const register = (data) => fetchAPI('/users/register', { method: 'POST', body: JSON.stringify(data) });

export const getTodos = () => fetchAPI('/todos');
export const createTodo = (data) => fetchAPI('/todos', { method: 'POST', body: JSON.stringify(data) });
export const updateTodo = (id, data) => fetchAPI(`/todos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const deleteTodo = (id) => fetchAPI(`/todos/${id}`, { method: 'DELETE' });

export const getPosts = () => fetchAPI('/posts');
export const getComments = (postId) => fetchAPI(`/comments/post/${postId}`);
export const createComment = (data) => fetchAPI('/comments', { method: 'POST', body: JSON.stringify(data) });

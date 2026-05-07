import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register, login } from '../services/api';
import { useAuth } from '../hooks/AuthContext.jsx';

function RegisterPage() {
  const [formData, setFormData] = useState({ username: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      const data = await login({ username: formData.username, password: formData.password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      navigate(`/users/${data.user.username}/app`);
    } catch (err) {
      setError(err.message.includes('already exists') ? 'Username or email already exists' : 'Registration failed');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Username" value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
          <input type="email" placeholder="Email" value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          <input type="tel" placeholder="Phone" value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <input type="password" placeholder="Password" value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          {error && <p className="error-msg">{error}</p>}
          <button type="submit">Register</button>
        </form>
        <Link to="/login" style={{ color: 'white' }}>Already have an account? Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;

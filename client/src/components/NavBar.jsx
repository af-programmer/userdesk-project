import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';

function NavBar({ username }) {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to={`/users/${username}/info`} className="nav-link">Info</Link>
        <Link to={`/users/${username}/todos`} className="nav-link">Todos</Link>
        <Link to={`/users/${username}/posts`} className="nav-link">Posts</Link>
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </nav>
  );
}

export default NavBar;

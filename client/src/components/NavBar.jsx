import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

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
    <nav>
      <Link to={`/users/${username}/info`}>Info</Link>
      <Link to={`/users/${username}/todos`}>Todos</Link>
      <Link to={`/users/${username}/posts`}>Posts</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;

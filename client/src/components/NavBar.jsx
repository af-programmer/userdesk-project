import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/app">Home</Link>
      <Link to="/todos">Todos</Link>
      <Link to="/posts">Posts</Link>
      <Link to="/info">Info</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default NavBar;

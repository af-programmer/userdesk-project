import { Link, useParams } from 'react-router-dom';

function AppPage() {
  const { username } = useParams();

  return (
    <div className="app-welcome">
      <h1>Welcome, {username}</h1>
      <div className="app-nav-grid">
        <Link to={`/users/${username}/info`}>Info</Link>
        <Link to={`/users/${username}/todos`}>Todos</Link>
        <Link to={`/users/${username}/posts`}>Posts</Link>
      </div>
    </div>
  );
}

export default AppPage;

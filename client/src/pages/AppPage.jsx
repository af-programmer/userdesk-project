import { Link, useParams } from 'react-router-dom';

function AppPage() {
  const { username } = useParams();

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <nav>
        <Link to={`/users/${username}/info`}>Info</Link>
        <Link to={`/users/${username}/todos`}>Todos</Link>
        <Link to={`/users/${username}/posts`}>Posts</Link>
      </nav>
    </div>
  );
}

export default AppPage;

import { Link } from 'react-router-dom';

function AppPage() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <nav>
        <Link to="/todos">Todos</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/info">Info</Link>
      </nav>
    </div>
  );
}

export default AppPage;

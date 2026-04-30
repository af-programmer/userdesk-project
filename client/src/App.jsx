import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import AppPage from './pages/AppPage';
import TodosPage from './pages/TodosPage';
import PostsPage from './pages/PostsPage';
import InfoPage from './pages/InfoPage';
import NavBar from './components/NavBar';

function App() {
  const { user } = useAuth();
  const username = user?.username;

  return (
    <>
      {user && <NavBar username={username} />}
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={`/users/${username}/app`} />} />
        <Route path="/users/:username/app" element={user ? <AppPage /> : <Navigate to="/login" />} />
        <Route path="/users/:username/todos" element={user ? <TodosPage /> : <Navigate to="/login" />} />
        <Route path="/users/:username/posts" element={user ? <PostsPage /> : <Navigate to="/login" />} />
        <Route path="/users/:username/info" element={user ? <InfoPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? `/users/${username}/app` : '/login'} />} />
      </Routes>
    </>
  );
}

export default App;

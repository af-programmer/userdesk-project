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

  return (
    <>
      {user && <NavBar />}
      <Routes>
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/app" />} />
        <Route path="/app" element={user ? <AppPage /> : <Navigate to="/login" />} />
        <Route path="/todos" element={user ? <TodosPage /> : <Navigate to="/login" />} />
        <Route path="/posts" element={user ? <PostsPage /> : <Navigate to="/login" />} />
        <Route path="/info" element={user ? <InfoPage /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? "/app" : "/login"} />} />
      </Routes>
    </>
  );
}

export default App;

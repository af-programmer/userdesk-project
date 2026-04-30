import { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import TodoItem from '../components/TodoItem';

function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => { loadTodos(); }, [filter]);

  const loadTodos = async () => {
    const params = filter !== 'all' ? { completed: filter === 'completed' } : {};
    const data = await getTodos(params);
    setTodos(data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await createTodo({ title: newTodo });
    setNewTodo('');
    loadTodos();
  };

  const handleToggle = async (id, completed) => {
    await updateTodo(id, { completed: !completed });
    loadTodos();
  };

  const handleEdit = async (id, title) => {
    await updateTodo(id, { title });
    loadTodos();
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    loadTodos();
  };

  return (
    <div>
      <h1>My Todos</h1>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="New todo"
        />
        <button type="submit">Add</button>
      </form>
      <div>
        {['all', 'active', 'completed'].map((f) => (
          <button key={f} onClick={() => setFilter(f)} disabled={filter === f}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default TodosPage;

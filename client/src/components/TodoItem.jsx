import { useState } from 'react';

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleEdit = () => { onEdit(todo.id, editTitle); setEditing(false); };

  return (
    <div className={`todo-item${todo.completed ? ' completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => onToggle(todo.id, todo.completed)} />
      {editing ? (
        <>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} style={{ flex: 1 }} />
          <button onClick={handleEdit}>Save</button>
          <button className="btn-ghost" onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <button className="btn-ghost" onClick={() => setEditing(true)}>Edit</button>
          <button className="btn-danger" onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TodoItem;

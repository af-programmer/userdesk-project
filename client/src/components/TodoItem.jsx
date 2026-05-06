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
          <input className="form-input flex-1" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <button className="btn btn-primary" onClick={handleEdit}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <span>{todo.title}</span>
          <button className="btn btn-secondary" onClick={() => setEditing(true)}>Edit</button>
          <button className="btn btn-danger" onClick={() => onDelete(todo.id)}>Delete</button>
        </>
      )}
    </div>
  );
}

export default TodoItem;

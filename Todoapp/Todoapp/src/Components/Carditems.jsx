import React, { useState } from 'react';
import './Carditem.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Carditems({ todo, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState('');

    // const resolveWithSomeData = new Promise(resolve => setTimeout(() => resolve("world"), 3000));
    // const toastId = React.useRef(null);
    const handleEdit = () => {
        setIsEditing(true);
        setNewTitle(todo.title);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewTitle('');
    };

    const handleUpdateTodo = () => {
        toast.success("🦄 Success Notification !", {
            position: "top-right",
            theme: "dark",
            autoClose: 2000,
            
        });
        onUpdate(todo.id, newTitle);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        setNewTitle(e.target.value);
    };


    return (
        // <div className="todo-item">
        <div className="card text-bg-secondary mb-3" style={{ maxWidth: '18rem' }}>
            <div className="card-header">Todo Item ID: {todo.id}</div>
            <div className="card-body">
                {isEditing ? (
                    <div>
                        <div style={{ marginTop: 30 }} >  <input type="text" value={newTitle} onChange={handleChange} /></div>
                        <div style={{ marginTop: 20 }} >  <button className="update-btn" onClick={handleUpdateTodo}>Update</button></div>
                        <div style={{ marginTop: 20 }}>  <button className="cancel-btn" onClick={handleCancel}>Cancel</button></div>

                    </div>
                ) : (
                    <div>
                        <h5 className="card-title" title={todo.title.length > 20? todo.title : ''}>Todo Title: {todo.title.length > 20 ? todo.title.substring(0, 20) + '...' : todo.title}</h5>
                        <button className="delete-btn" onClick={() => onDelete(todo.id)}>Delete</button>

                        <button className="edit-btn" onClick={handleEdit}>Update</button>

                    </div>
                )}
            </div>
        </div>
        // </div>
    );
}

export default Carditems;

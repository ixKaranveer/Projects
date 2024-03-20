import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';
import Cards from './Cards.jsx';
import { toast } from 'react-toastify';

const Navbar = () => {
    const [title, setTitle] = useState('');
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState('');

    const apiUrl = "https://jsonplaceholder.typicode.com/todos";
 const fetchData = async () => {
            try {
                const response = await axios.get(apiUrl);
                setTodos(response.data);
            } catch (error) {
                setError('Error fetching todos');
            }
        };

    useEffect(() => {
       

        fetchData();
    }, []);

    const handleDeleteTodo = (id) => {
        axios.delete(`${apiUrl}/${id}`)
            .then(response => {
                if (response.status === 200) {
                    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                } else {
                    setError('Failed to delete todo');
                }
            })
            .catch(error => {
                setError('Error deleting todo');
            });
            toast.error("🚀Delete Successfully!",{
                theme: "colored",
                autoClose: 2000,
            })
    };

    const handleUpdateTodo = (id, newTitle) => {
        axios.put(`${apiUrl}/${id}`, { title: newTitle })
            .then(response => {
                if (response.status === 200) {
                    setTodos(prevTodos => prevTodos.map(todo => {
                        if (todo.id === id) {
                            return { ...todo, title: newTitle };
                        }
                        return todo;
                    }));
                } else {
                    setError('Failed to update todo');
                }
            })
            .catch(error => {
                setError('Error updating todo');
            });
    };

    const handleAddTodo = () => {
        // Check if both title and id are not empty
        if (title.trim() !== '') {
            // Create a new todo object with the provided title and id
            const newTodo = {
                title: title
            };
            // Update the todos state by appending the new todo
            setTodos([...todos, newTodo]);
            // Clear the input fields by resetting title and id states
            setTitle('');
toast.success("added successfully",{
    theme: "colored",
    autoClose: 2000
})
        }
    };



    return (
        <div className='Navbar'>
            <div className='todo-wrapper'>
                <img className='imgtag' src='https://t3.ftcdn.net/jpg/01/00/65/64/360_F_100656447_xzaQm1D1p6oWUX4WCBX7LiDyD8Dw9sJw.jpg' />
                <div className='todo-input'>
                    <div className='todo-input-item'>
                        <label>Title :</label>
                        <input
                            type="text"
                            placeholder="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {/* <div className='todo-input-item'>
                        <label>Id :</label>
                        <input
                            type="text"
                            placeholder="What's the task Id?"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </div> */}
                    <div className="todo-input-item">
                        <button
                            type="button"
                            className="primaryBtn"
                            onClick={handleAddTodo} // Call handleAddTodo function on button click
                        >
                            Add
                        </button>
                    </div>
                </div>
                <div className="todo-task">
                    <Cards todos={todos} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
                    {error && <div className="error">{error}</div>}
                </div>
            </div>
        </div>
    );
}
export default Navbar;

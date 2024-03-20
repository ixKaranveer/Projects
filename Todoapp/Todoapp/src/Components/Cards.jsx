import React from 'react';
import Todocard from './Todocard.jsx'; // Correct import path
import './Cards.css';

function Cards({ todos, onDelete, onUpdate }) {
    return (
      <div className="todo-list">
          {/* {todos.map(todo => (
            <Carditems key={todo.id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
          ))} */}
         <Todocard todos={todos} onDelete={onDelete} onUpdate={onUpdate} />
      </div>
    );
}
  
export default Cards;



import React, { useState } from 'react';
import { Pagination } from 'antd';
import Carditems from './Carditems.jsx';
import './Todocard.css'

const Todocard = ({ todos, onDelete, onUpdate }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const todosPerPage = 15;

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const itemRender = (_, type, originalElement) => {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  };

  return (
    <div className="card text-bg-secondary mb-3" style={{width:"100%"}}>
      <div className="card-header">Todo List</div>
      <div className="card-body">
        {/* <ul className="list-group list-group-flush"> */}
          {currentTodos.map(todo => (
            <div key={todo.id} style={{margin: 10, display: "flex"}}><Carditems
              key={todo.id} 
              todo={todo}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
            </div>
          ))}
        {/* </ul> */}
        <Pagination
          total={todos.length}
          current={currentPage}
          pageSize={todosPerPage}
          onChange={handlePageChange}
          itemRender={itemRender}
        />
      </div>
    </div>
  );
};

export default Todocard;

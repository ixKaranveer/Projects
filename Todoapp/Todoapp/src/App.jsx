import React from 'react'
// import axios from 'axios';
import Navbar from '../src/Components/Navbar.jsx';
import { ToastContainer } from 'react-toastify';
// import Pagination from '../src/Components/Pagination.jsx'


function App() {
  return (
    <div className="App">
        <ToastContainer />
          <Navbar />
          {/* Add pagination component here if needed */}
      </div>
  );
}

export default App

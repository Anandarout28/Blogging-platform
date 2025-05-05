import React from 'react';
import { useNavigate } from 'react-router-dom';

import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="logo">
      <span><h2>Write</h2></span> 
        <button onClick={() => navigate('/write')}> ➕ </button>
       
      </div>

      <nav className="nav-items">
        <a href="#" className="nav-item"><h2>Read blogs</h2></a>
        <a href="#" className="nav-item"><h2>Your blogs</h2></a>
      </nav>

    </header>
  );
};

export default Navbar;

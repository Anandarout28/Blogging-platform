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
        <button className='nav-item' onClick={()=> navigate('/read')}><h2>Read blogs</h2></button>
   <button className='nav-item' onClick={()=> navigate('/user/id')}><h2>your blogs</h2></button>
      </nav>

    </header>
  );
};

export default Navbar;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="logo">
      <span><h2>Write</h2></span> 
        <button onClick={() => navigate('/write')}> ➕ </button>
       
      </div>

    
            <Button className='add-button' onClick={()=> navigate()} label="" text >  <span><h2>Read</h2></span> </Button>
            <Button className='add-button' onClick={()=> navigate()} text > <span><h2>For you</h2></span> </Button>
        <Button className='add-button' onClick={()=> navigate()}  text >  <span><h2>Following</h2></span> </Button>
        <Button className='add-button'onClick={()=> navigate()}  text >  <span><h2>Read</h2></span> </Button>
      
    </header>
  );
};

export default Navbar;

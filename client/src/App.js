import React from 'react';
import styled from 'styled-components';
import './App.css';
import Signin from './pages/auth/LoginPage';
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/component/navbar'; // Updated import with uppercase 'Navbar'

function Home() {
  return (
    <HomeWrapper>
      <div className="container">
        <Navbar /> {/* Corrected usage of Navbar */}
      </div>
    </HomeWrapper>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// Removed unused Buttons styled component
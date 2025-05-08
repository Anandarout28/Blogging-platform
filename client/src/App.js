import {React,useState} from 'react';
import styled from 'styled-components';
import './App.css';
import Signin from './pages/auth/LoginPage';
import OtpVerify from './pages/auth/otpVerifactionpage'; // Importing the OTP verification page
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/component/navbar'; // Updated import with uppercase 'Navbar'

function Home() {
return(

<HomeWrapper>
<NavbarComponent />
<Navbar />
</HomeWrapper>

)
;
  };

 


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<Editor/>} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/OtpVerify" element={<OtpVerify/>} />
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
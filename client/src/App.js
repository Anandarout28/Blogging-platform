import React from 'react';
import styled from 'styled-components';
import './App.css';
import Signin from './pages/auth/LoginPage';
import OtpVerify from './pages/auth/otpVerifactionpage'; // Importing the OTP verification page
import { Routes, Route } from 'react-router-dom';
import Footer from './pages/components/footer';
import Header from './pages/components/Header';
import Blog from './component/BLOGS/blog';
import Body from './pages/components/body';
import Dashboard from './pages/components/dashboard'; 
import  Read from   './component/BLOGS/read' 
import ProtectedRoute from './Protectedroute';
// Importing the editor component
function Home() {
return(

<HomeWrapper>
<Header/>
<Body/>
<Footer/>
</HomeWrapper>

)
;
  };



 
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route  path="/dashboard" element={
        <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
         
            
         } />
    
      <Route path="/read" element={<Read />} />
 
      <Route path="/write" element={<Blog/>} />
      <Route path="/read" element={<Read/>} />
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
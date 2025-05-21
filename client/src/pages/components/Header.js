import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DynamicText from './dynamic';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { FaRegUser } from "react-icons/fa";
import { Button } from 'primereact/button'; // Importing PrimeReact button
import './navbar.css' // Import search icon

function Header() { // Renamed to follow React naming conventions
  const navigate = useNavigate(); // Correctly use the hook

  return (
    <StyledNavbar className="bg-body-tertiary">
      <Row className="w-100 justify-content-between align-items-center">
        {/* Search Bar on the Left */}
        <Col xs="auto" className="left-col">
          <h1>QuantumPulse </h1> 
           </Col>
          
        <Col xs = "auto" className="sea-bar">
          <Form inline className="d-flex align-items-center">
            <StyledFormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <SearchButton type="submit">
              <FaSearch /> {/* Search icon */}
            </SearchButton>
          </Form>
        </Col>
<Col xs="auto" className="dyn">
  <DynamicText/>
</Col>
 <Col xs="auto" className="right-col">
 <nav className="nav-items">

         <StyledButton1 onClick={()=> navigate ('/dashboard')} text>Home</StyledButton1>
            <StyledButton1 text >latest</StyledButton1>
            <StyledButton1  text >About us</StyledButton1>
            <StyledButton onClick={()=> navigate ('/signin')}  ><FaRegUser style={{color:'black'}}/></StyledButton>
      </nav>
    
      </Col>
       
       

      </Row>
    </StyledNavbar>
  );
}

export default Header;

const StyledNavbar = styled(Navbar)`
  position: fixed; /* Fixes the navbar at the top */
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 80px; /* Adjust the height of the navbar */
  /* Ensures it stays above other elements */
  background-color: none; /* Optional: Background color */
 border-bottom: 1px solid #ccc; /* Adds a horizontal line */
  margin-bottom: -5px; /* Moves the line 5px upwards */
  padding: 8px 10px; /* Adds some padding for better spacing */
`;

const StyledFormControl = styled(Form.Control)`
  width: 300px; /* Adjust the width of the search bar */
  height: 45px; /* Adjust the height of the search bar */
  font-size: 16px; /* Adjust the font size */
  padding: 10px; /* Add padding for better spacing */
  border-radius: 8px; /* Add rounded corners */
  border: 1px solid #ccc; /* Add a border */
  box-shadow: 0 5px 4px rgba(0, 0, 0, 0.1); /* Optional: Add a shadow */

  &:focus {
    outline: none;
    border-color: #6c757d; /* Change border color on focus */
    box-shadow: 0 0 5px rgba(108, 117, 125, 0.5); /* Add focus shadow */
  }
`;

const StyledButton = styled(Button)`
  background-color: rgb(249, 253, 253);
  border-radius: 100px;
  color: rgb(94, 164, 24);
  cursor: pointer;
  padding: 7px 20px;
  text-align: center;
  transition: all 250ms ease-in-out;
  border: 0;
  font-size: 16px;

  &:hover {
    background-color: lightgreen;
    transform: scale(1.05);
  }
`;

const StyledButton1 = styled(Button)`
  background-color:none;
  border-radius: 100px;
  color: rgb(40, 37, 37);
  cursor: pointer;
  padding: 7px 20px;
  text-align: center;
  transition: all 250ms ease-in-out;
  border: 0;
  font-size: 16px;

  &:hover {
    background-color: rgb(106, 224, 122);
    color: rgb(3, 9, 5);
    transform: scale(1.05);
  }
`;

const SearchButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: rgb(40, 37, 37);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    color: rgb(198, 203, 207);
  }
`;
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DynamicText from './dynamic';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Button as PrimeButton } from 'primereact/button'; // Importing PrimeReact button
import './navbar.css' // Import search icon

function Header() { // Renamed to follow React naming conventions
  const navigate = useNavigate(); // Correctly use the hook

  return (
    <StyledNavbar className="bg-body-tertiary">
      <Row className="w-100 justify-content-between align-items-center">
        {/* Search Bar on the Left */}
        <Col xs="auto">
          <Form inline className="d-flex align-items-center">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
            <SearchButton type="submit">
              <FaSearch /> {/* Search icon */}
            </SearchButton>
          </Form>
        </Col>
<Col>
  <DynamicText/>
</Col>
<Col xs="auto">
 <nav className="nav-items">

         <StyledButton1 label="" text raised >Home</StyledButton1>
            <StyledButton1 label="Secondary" severity="secondary" text raised>latest</StyledButton1>
            <StyledButton1 label="Success" severity="success" text raised >About us</StyledButton1>
      </nav>
    
      </Col>
        {/* SignIN Button on the Right */}
        <Col xs="auto">
          <StyledButton onClick={() => navigate('/signin')}><h1>🧑‍🦰</h1></StyledButton>
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
  z-index: 10000; /* Ensures it stays above other elements */
  background-color:rgba(90, 196, 14, 0.35); /* Optional: Background color */
  box-shadow: 0 2px 4px rgba(235, 233, 233, 0.1); /* Optional: Adds a shadow for better visibility */
  padding: 10px 20px; /* Adds some padding for better spacing */
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
  background-color: rgb(249, 253, 253);
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
  color:rgb(40, 37, 37);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    color:rgb(198, 203, 207);
  }
`;
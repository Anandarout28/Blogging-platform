import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DynamicText from './dynamic';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa'; // Import search icon

function NavbarComponent() { // Renamed to follow React naming conventions
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
        {/* SignIN Button on the Right */}
        <Col xs="auto">
          <StyledButton onClick={() => navigate('/signin')}>Signin</StyledButton>
        </Col>
      </Row>
    </StyledNavbar>
  );
}

export default NavbarComponent;

const StyledNavbar = styled(Navbar)`
  position: fixed; /* Fixes the navbar at the top */
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 10000; /* Ensures it stays above other elements */
  background-color: #f8f9fa; /* Optional: Background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Optional: Adds a shadow for better visibility */
  padding: 10px 20px; /* Adds some padding for better spacing */
`;

const StyledButton = styled(Button)`
  background-color: rgb(249, 253, 253);
  border-radius: 100px;
  color: green;
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

const SearchButton = styled(Button)`
  background-color: transparent;
  border: none;
  color: #6c757d;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  cursor: pointer;

  &:hover {
    color: #495057;
  }
`;
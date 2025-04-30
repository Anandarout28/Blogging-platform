import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';

function NavbarComponent() { // Renamed to follow React naming conventions
  const navigate = useNavigate(); // Correctly use the hook

  return (
    <Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className="mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
          <Col xs="auto">
            <StyledButton onClick={() => navigate('/signin')}>SignIN</StyledButton>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default NavbarComponent;

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
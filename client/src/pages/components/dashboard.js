import styled from 'styled-components'
import { FaHome, FaEdit, FaBell, FaUser } from "react-icons/fa";
import Footer from './footer'
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom'; 
import Form from 'react-bootstrap/Form';
import { Button } from 'primereact/button'; // Importing PrimeReact button
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaSearch } from 'react-icons/fa';
import { IoNotifications } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import './body.css';
import NavbarD from './navbar';
// Import custom styles
export default function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
  localStorage.removeItem('accessToken');
  // Optionally, redirect to login or home page
  window.location.href = '/signin';
}; // Correctly use the hook
   
  return (
        <HomeWrapper>
       
 <StyledNavbar >
      <Row className="w-100 justify-content-between align-items-center padding-10px">
        {/* Left-Aligned Content */}
        <Col xs="auto" className="left-col">
          <h1>Quantum Plus</h1>
        </Col>

        {/* Center-Aligned Content */}
        <Col xs="auto" className="search-col">
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

        {/* Right-Aligned Content */}
        <Col xs="auto" className="right-col">
          <nav className="nav-items">
            <StyledButton1 >
              Home
            </StyledButton1>
            <StyledButton1 onClick={() => navigate('/write')} >
              <FiEdit/>
            </StyledButton1>
            <StyledButton1 >
              <IoNotifications />
            </StyledButton1>

          <StyledButton onClick={handleLogout} title="Logout">
  <FaUser />
</StyledButton>
      
          </nav>
        </Col>
      </Row>
    </StyledNavbar>
<Footer/>
<NavbarD/>
<Boarder/>
         <VerticalNavbar/>
</HomeWrapper>
  )
}


const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 80px; // Add this line to push content below the navbar
`;
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
  position: relative;
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
// Add this import at the top if not present


// Add this styled component
const VerticalNavbar = styled.div`
  position: fixed;
  top: -2%; /* below the horizontal navbar */
  right: 1%;
  
  width: 5px;
  height: calc(100vh - 80px);
  background: #f8f9fa;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  z-index: 101;
  gap: 30px;
`;
const Boarder = styled.div`
  position: fixed;
  top: -2%; /* below the horizontal navbar */
  Left: 1%;
  
  width: 5px;
  height: calc(104vh - 90px);
  background: #f8f9fa;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  z-index: 101;
  gap: 30px;
`;

const VerticalNavButton = styled.button`
  background: none;
  border: none;
  margin: 10px 0;
  font-size: 1.7rem;
  color: #333;
  cursor: pointer;
  transition: color 0.2s;
  &:hover {
    color: #4caf50;
  }
`;
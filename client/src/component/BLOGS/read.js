import { useNavigate } from 'react-router-dom'; 
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { Button } from 'primereact/button'; // Importing PrimeReact button
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { IoNotifications } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import './read.css'; // Import custom styles
import { FaPlus } from "react-icons/fa6";



const Read = () => {

 
   const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/blogs')
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);


  const navigate = useNavigate(); // Correctly use the hook
const items = [
        { label: 'Dashboard', icon: 'pi pi-home' },
        { label: 'Transactions', icon: 'pi pi-chart-line' },
        { label: 'Products', icon: 'pi pi-list' },
        { label: 'Messages', icon: 'pi pi-inbox' }
    ];
  return (
    <HomeWrapper>
   
    <VerticalNavbar/>
    <StyledNavbar >
      <Row className="w-100 justify-content-between align-items-center padding-10px">
        {/* Left-Aligned Content */}
        <Col xs="auto" className="left-col">
          <h1>Quantum Plus</h1>
        </Col>

        {/* Center-Aligned Content */}
        <Col xs="auto" className="center-col">
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
            <StyledButton1 onClick={ ()=> navigate ('/dashboard')}>
              Home
            </StyledButton1>
            <StyledButton1 onClick={() => navigate('/write')} >
              <FiEdit/>
            </StyledButton1>
            <StyledButton1 >
              <IoNotifications />
            </StyledButton1>
            <StyledButton >
              <h1>🧑‍🦰</h1>
            </StyledButton>
          </nav>
        </Col>
      </Row>
    </StyledNavbar>
    <header className="navbar" >
         
    <div className='nav-items' >
        
            <Button className='add-button' text><FaPlus/> </Button>
                <Button className='add-button' onClick={()=> navigate('/read')} text >  <span>For you</span> </Button>
                <Button className='add-button' onClick={()=> navigate()} text > <span>CyberSecurity</span> </Button>
            <Button className='add-button' onClick={()=> navigate()}  text>  <span>Blockchain</span> </Button>
         <Button className='add-button' onClick={()=> navigate()}  text>  <span>Blockchain</span> </Button>
        <Button className='add-button' onClick={()=> navigate()} text >  <span>Data Science</span> </Button>
        <Button className='add-button' onClick={()=> navigate()} text >  <span>AI</span> </Button>
         </div>   
        </header>
{/* Main Content */}

   <div class="scrollable-card-area">

        <div class="section-content">
            <div class="content-wrapper">
                <div class="box box-1">
                    <div class="first">
                        <h2>Web development</h2>
                    </div>
                    <div class="second">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p><a href="#">Find out more</a></p>
                    </div>
                </div>
                <div class="box box-2">
                    <div class="first">
                        <h2>Data analysis</h2>
                    </div>
                    <div class="second">
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p><a href="#">Find out more</a></p>
                    </div>
                </div>
              
                <div class="box box-1">                     <div class="first">
                        <h2>App Development</h2>
                    </div>
                    <div class="second">
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p><a href="#">Learn More</a></p>
                    </div>
                </div>
                <div class="box box-2">
                    <div class="first">
                        <h2>Cloud Solutions</h2>
                    </div>
                    <div class="second">
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p><a href="#">Discover</a></p>
                    </div>
                </div>
                <div class="box box-1">
                    <div class="first">
                        <h2>AI & Machine Learning</h2>
                    </div>
                    <div class="second">
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.</p>
                        <p><a href="#">Explore</a></p>
                    </div>
                    
                </div>
                  <div class="box box-1">
                    <div class="first">
                        <h2>AI & Machine Learning</h2>
                    </div>
                    <div class="second">
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione.</p>
                        <p><a href="#">Explore</a></p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>


    </HomeWrapper>
       
  );
}

export default Read;

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
const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const VerticalNavbar = styled.div`
  position: fixed;
  top:210px; /* below the horizontal navbar */
  right: 30%;
  color: rgb(255, 245, 245);
  width: 5px;
  height: 100%;
  background: rgba(21, 32, 29, 0.49);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  z-index: 101;
  gap: 30px;
`;
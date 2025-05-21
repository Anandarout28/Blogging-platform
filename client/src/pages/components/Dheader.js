import {
  HomeWrapper,
  SearchButton,
  StyledButton, 
  Boarder,
  StyledNavbar,
  VerticalNavbar,
  StyledButton1, 
  StyledFormControl
} from './stylecom';
import {  FaUser } from "react-icons/fa";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaSearch } from 'react-icons/fa';
import { IoNotifications } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
function DasHeder() {
     const navigate = useNavigate();
  return (
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
    
              <StyledButton >
      <FaUser />
    </StyledButton>
              </nav>
            </Col>
          </Row>
        </StyledNavbar>
    
  )
}

export default DasHeder;

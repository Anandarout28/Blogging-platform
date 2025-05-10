import React from "react";
import styled from "styled-components";
import '../../App.css' // Importing the CSS file for styling

const Footer = () => {
  return (
    <div className="footer">
    <StyledText>
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </StyledText>
    </div>
  );
};
const StyledText = styled.div`
  font-size: rem; /* Bigger text size */
  text-align: center;
  padding: 1rem;
  color:rgb(12, 14, 12); /* Stylish green color */
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* Adds a shadow for style */
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
  

export default Footer;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DynamicText = () => {
  const messages = ['Blogging', 'Learning', 'Coding', 'Building'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % messages.length);
    }, 2000); // change text every 2 seconds

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <StyledText>
      {messages[index]}
    </StyledText>
  );
};

export default DynamicText;

const StyledText = styled.div`
  font-size: 3rem; /* Bigger text size */
  font-weight: bold;
  text-align: center;
  padding: 1rem;
  color: #4caf50; /* Stylish green color */
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
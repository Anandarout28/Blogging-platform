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
  <div className='StyledText'>
      {messages[index]}
    </div>
  );
};

export default DynamicText;

const StyledText = styled.div`
  font-size: 3rem; /* Bigger text size */
  font-weight: bold;
  text-align: center;
  padding: 2px;
  color:rgba(90, 189, 28, 0.68); /* Stylish green color */
  font-family: 'Arial', sans-serif;
  text-shadow: 2px 2px 4px rgba(16, 12, 12, 0.3); /* Adds a shadow for style */
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

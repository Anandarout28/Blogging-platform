import React, { useEffect, useState } from "react";
import axios from "axios";

const Read = () => {
    const [texts, setTexts] = useState([]);
  
    useEffect(() => {
      axios.get("http://localhost:8000/api/")
        .then((response) => {
          setTexts(response.data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  
    return (
      <div>
      
        
  
        <h1>Text from Database</h1>
        {texts.map((text, index) => (
          <p key={index}>{text.content}</p>
        ))}
      </div>
    );
  };
  
  export default Read;
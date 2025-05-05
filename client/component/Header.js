import React, { useState, useEffect } from "react";
import "./Header.css";


export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
    console.log("isNavVisible:", !isNavVisible); 
};
  return (
    <header className="Header">
      <img src={require("./logo/logo.png")} className="Logo" alt="logo" />


        <div className="dropdown">
    <button className="dropbtn" onClick={toggleNav}>
        <img src={require("./logo/user.png")} className="Logo" alt="user logo" />  
        <span className="userName">User</span>
    </button>
    <div className={`dropdown-content ${isNavVisible ? "show" : ""}`}>
        <a href="/signin">Signin</a>
        <a href="#">your blog</a>
    </div>
</div>
   
    
    </header>
  );
}
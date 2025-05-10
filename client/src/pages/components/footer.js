import React from "react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    backgroundColor: "green",
    color: "white",
    textAlign: "center",
    padding: "10px",
  },
};

export default Footer;

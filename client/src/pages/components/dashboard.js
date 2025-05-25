import React from "react";
import { CardText, Button, Card, CardTitle } from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DasHeader from "./Dheader";
import NavbarD from "./navbar";
import Footer from "./footer";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <DasHeader />
      <NavbarD />

      {/* Main Content Container */}
      <div className="content1">
        
        
            
              <Card body className="blog-card">
                <CardTitle tag="h5">Say Goodbye To Axios In 2025</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
         
              <Card body className="blog-card">
                <CardTitle tag="h5">Say Goodbye To Axios In 2025</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
           <Card body className="blog-card">
                <CardTitle tag="h5">Say Goodbye To Axios In 2025</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
         
           
      </div>
      <div className="content2">
<Card body className="blog-card">
                <CardTitle tag="h5">Say Goodbye To Axios In 2025</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
              <Card body className="blog-card">
                <CardTitle tag="h5">Say Goodbye To Axios In 2025</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
              <Card body className="blog-card">
                <CardTitle tag="h5">Say Goodbye To Axios In 2025</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>

      </div>

      <Footer />
    </div>
  );
}

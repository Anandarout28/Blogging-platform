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
      <div className="content">
        {["blog1", "blog2", "blog3", "blog4"].map((blogClass, index) => (
          <Row key={index} className={`blog-section ${blogClass}`}>
            <Col sm="6" className="card-container">
              <Card body className="blog-card">
                <CardTitle tag="h5">Special Title Treatment</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
            </Col>
            <Col sm="6" className="card-container">
              <Card body className="blog-card">
                <CardTitle tag="h5">Special Title Treatment</CardTitle>
                <CardText>Supporting text for additional content.</CardText>
                <Button color="primary">Go somewhere</Button>
              </Card>
            </Col>
          </Row>
        ))}
      </div>

      <Footer />
    </div>
  );
}

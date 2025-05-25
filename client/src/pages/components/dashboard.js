import React from "react";
import { CardText, Button, Card, CardTitle } from "reactstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DasHeader from "./Dheader";
import NavbarD from "./navbar";
import Footer from "./footer";
import "./dashboard.css"; // Import custom styles
export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <DasHeader />
      <NavbarD />

      {/* Main Content Container */}
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



      <Footer />
    </div>
  );
}

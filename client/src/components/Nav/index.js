import React, { useState } from 'react';
import "./style.css";
import * as ReactBootStrap from "react-bootstrap";

function Navbar(){
  
  return (
    <div>
  <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <ReactBootStrap.Navbar.Brand href="#home">Loopti</ReactBootStrap.Navbar.Brand>
  <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStrap.Nav>
      <ReactBootStrap.Nav.Link href="/sign-in">Login</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link eventKey={2} href="/sign-up">Sign up</ReactBootStrap.Nav.Link>
    </ReactBootStrap.Nav>
  </ReactBootStrap.Navbar.Collapse>
</ReactBootStrap.Navbar>
  
    </div>
  );
};

export default Navbar;
import React, { useState } from 'react';
import * as ReactBootStrap from "react-bootstrap";
import { useHistory } from 'react-router';
import { FaSpinner } from 'react-icons/fa';
import './style.css';



function Navbar(props){
  const history = useHistory();
  // const userToken = JSON.parse(localStorage.getItem('user'));
  // console.log( 'Session token: ', userToken);
  // const jwt = userToken ? userToken.jwt : '';
  
  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   props.setJWT('');
  //   localStorage.removeItem('user');
  //   history.push('/sign-in');
  // }
  const renderAfterSigninButtons =  <>

      <ReactBootStrap.Nav.Link href="/createTask">
          <i className="fa fa-plus" style={{ color: 'white' }}></i>
      </ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link href="/tasks">
          <i className="fa fa-calendar px-1" style={{ color: 'white' }}></i>
      </ReactBootStrap.Nav.Link>

      <ReactBootStrap.Nav.Link href="/events">
          <i className="fa fa-bullseye px-1" style={{ color: 'white' }}></i>
      </ReactBootStrap.Nav.Link>

      <ReactBootStrap.Nav.Link href="/createTask"><i className="fa fa-plus" style={{ color: 'white' }}></i></ReactBootStrap.Nav.Link>


      <ReactBootStrap.Nav className="ml-auto">
        <ReactBootStrap.Nav.Link href="/logout">Logout</ReactBootStrap.Nav.Link>
      </ReactBootStrap.Nav>
    </>;
  const renderBeforeSigninButtons =  <>
    <ReactBootStrap.Nav className="ml-auto">
      <ReactBootStrap.Nav.Link href="/sign-in">Login</ReactBootStrap.Nav.Link>
      <ReactBootStrap.Nav.Link  href="/sign-up">Sign up</ReactBootStrap.Nav.Link>
      </ReactBootStrap.Nav>
  </>;
  return (
    <div className="mb-5">
      <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <ReactBootStrap.Navbar.Brand href="#home">L<FaSpinner icon="spinner" className="spinner" /><FaSpinner icon="spinner" className="spinner" />pti</ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
          {
            props.jwt ? renderAfterSigninButtons : renderBeforeSigninButtons
          }
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>
    </div>
  );
};

export default Navbar;
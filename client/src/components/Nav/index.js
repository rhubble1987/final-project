/**
 * TODO
 * 
 * components that takes
 * {@param commands} array of command
 * {@param command = {title: string, uri: string}}
 * 
 * Loop through the elememts amd display a <Link /> with "to" prop set to "uri"
 * and title been displayed into the Link component
 *  */

 import React from "react";
 import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

 function App() {
return (<Router>
<div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>LOOPTI</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Sign in</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </div>

      </Router>

      );
}
export default App;
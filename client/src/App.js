import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Tasks from "./screens/Tasks";
import Navbar from './components/Nav';

function App() {
  return (
  <div>
  <Router>
  <Navbar fixed="top"/>
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/createTask" component={Tasks} />
          </Switch>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;

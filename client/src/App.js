import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Tasks from "./screens/Tasks";
import Navbar from './components/Nav';
import Logout from './screens/Logout';
import CreateTask from './screens/CreateTask';

function App() {
  const [jwt, setJWT] = useState('');
  return (
  <div>
  <Router>
  <Navbar setJWT={setJWT} jwt={jwt} fixed="top"/>
      <div className="outer">
        <div className="inner">
          <Switch>
            <Route exact path='/' component={() => <Login setJWT={setJWT} />} />
            <Route path="/sign-in" component={() => <Login setJWT={setJWT} />} />
            <Route path="/sign-up" component={() => <SignUp setJWT={setJWT} />} />
            <Route path="/tasks" component={() => <Tasks jwt={jwt} />} />
            <Route path="/createTask" component={CreateTask} />
          </Switch>
        </div>
      </div>
    </Router>
    </div>
  );
}

export default App;

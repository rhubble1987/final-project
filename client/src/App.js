import React, { useEffect, useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Navbar from './components/Nav';
import CreateTask from './screens/CreateTask';

import CalendarForToday from './screens/Calendar';

import PrivateRoute from './components/PrivateRoute'
import Logout from './screens/Logout';

import Tasks from "./screens/Tasks";
import EventBlock from "./screens/EventBlocks";



function App() {
  const [jwt, setJWT] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setJWT(user.jwt);
    }
  }, [])
  return (
  <div>
  <Router>
  <Navbar setJWT={setJWT} jwt={jwt} fixed="top"/>
        <div className="inner col-md-5">
          <Switch>
            <Route path="/sign-in" component={() => <Login setJWT={setJWT} />} />
            <Route path="/sign-up" component={() => <SignUp />} />
            <PrivateRoute path="/tasks" component={CalendarForToday} />
            <PrivateRoute path="/alltasks" component={Tasks} />
            <PrivateRoute path="/logout" component={() => <Logout />} />
            <PrivateRoute path="/newevent" component={() => <EventBlock />} />
            <PrivateRoute path="/createTask" component={CreateTask} />
            <Redirect to='/sign-in' />
          </Switch>
        </div>
    </Router>
    </div>
  );
}

export default App;
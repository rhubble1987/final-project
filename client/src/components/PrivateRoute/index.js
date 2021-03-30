import React from 'react';
import { Redirect, Route } from 'react-router';

const PrivateRoute = (props) => {
    const user = localStorage.getItem('user') || null;

    return !!user ? (<Route {...props} />) : <Redirect to="sign-in" />
}

export default PrivateRoute;
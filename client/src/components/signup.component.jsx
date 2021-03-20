import React, { Component, useState } from "react";
import axios from 'axios';

const SignUp = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3005/api/users', { email, password, firstName, lastName });
        console.log(response);
    }
        return (
            <form>
                <h3>Register</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={email}  onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>
        );
}

export default SignUp;
import axios from 'axios';
import React, { useState } from "react";

import FormGroup from "../../components/FormGroup";
import TextInput from "../../components/TextInput";
import { loginUser } from "../../httpClient";

const handleSubmit = (email, password) => async (e) => {
    e.preventDefault();
    const response = await loginUser({ email, password });
    console.log(response);
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <form>

            <h3>Log in</h3>

            <FormGroup label="Email">
                <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </FormGroup>


            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
            </div>

            <FormGroup>
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </FormGroup>

            <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit(email, password)}>Sign in</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    );
}
export default Login;
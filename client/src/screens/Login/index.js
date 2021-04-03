import axios from 'axios';
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import { SigningKeyPage } from 'twilio/lib/rest/api/v2010/account/signingKey';
import FormGroup from "../../components/FormGroup";
import TextInput from "../../components/TextInput";
import { loginUser } from "../../httpClient";
//import {Redirect} from 'react-router-dom';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMessage, setErrorMessage] = useState('');
    const history = useHistory();
    const [errors, setErrors] = useState([]);
    
    // Adding validation for email and password
    const validateUserSignIn = () => {
        const signInErr = [];
        if (email.length===0) {
            signInErr.push('Please provide email address');
        } else if (email.length > 40) { // email should be of below 40 characters
            signInErr.push('Please enter a valid email');
        }
        if (password.length === 0) {
            signInErr.push('Please provide password.!');
        } else if (password.length > 20) { //password should be of below 20 characters.
            signInErr.push('Password should not exceed 20 char.s');
        }
        setErrors(signInErr);
        return (signInErr.length === 0);
    }

    const handleSubmit = (email, password) => async (e) => {
        e.preventDefault();
        setErrorMessage('');
        if (validateUserSignIn()) {
            const response = await loginUser({ email, password });
            if (response.status) {
                props.setJWT(response.data.jwt);
                localStorage.setItem('user', JSON.stringify(response.data));
                history.push('/tasks');
            } else {
                localStorage.removeItem('user');
                setErrorMessage(response.data); 
            }
        }
    }
    
    return   (
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
            { errMessage && <label className="text-danger">{errMessage}</label> }
            {
                errors.map(err => <span><label className="text-danger">{err}</label><br /></span>)
            }
            <button type="submit" className="btn btn-dark btn-lg btn-block" onClick={handleSubmit(email, password)}>Sign in</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
   
    );
    
}
export default Login;
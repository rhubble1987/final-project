import React, { useState } from "react";
import axios from 'axios';

import { createUser } from "../../httpClient";
import FormGroup from "../../components/FormGroup";
import TextInput from "../../components/TextInput";

const handleSubmit = (email, password, firstName, lastName) => async (e) => {
    e.preventDefault();
    const response = await createUser({ email, password, firstName, lastName });
    console.log(response);
}

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    return (
        <form>
            <h3>Today's Task</h3>

            <FormGroup label="First name">
                <TextInput value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
            </FormGroup>

            <FormGroup label="Last name">
                <TextInput value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
            </FormGroup>

            <FormGroup label="Email">
                <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
            </FormGroup>

            <FormGroup label="Password">
                <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
            </FormGroup>

            <button type="submit" onClick={handleSubmit(email, password, firstName, lastName)} className="btn btn-dark btn-lg btn-block">Register</button>
            <p className="forgot-password text-right">
                Already registered <a href="#">log in?</a>
            </p>
        </form>
    );
}

export default SignUp;
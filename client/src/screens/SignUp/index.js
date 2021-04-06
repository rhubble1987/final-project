import React, { useState } from "react";
import { createUser } from "../../httpClient";
import FormGroup from "../../components/FormGroup";
import TextInput from "../../components/TextInput";
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const history = useHistory();

    const handleSubmit = (email, password, firstName, lastName, mobileNumber) => async (e) => {
        e.preventDefault();
        const response = await createUser({ email, password, firstName, lastName, mobileNumber });
        history.push('/sign-in');
        console.log(response);
    }

    return (
        <form>
            <h3>Register</h3>

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


            <FormGroup label="Mobile Number">
                <TextInput value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="(000)000-000" />
            </FormGroup>

            <button type="submit" onClick={handleSubmit(email, password, firstName, lastName, mobileNumber)} className="btn btn-dark btn-lg btn-block">Register</button>
        </form>
    );
}
export default SignUp;
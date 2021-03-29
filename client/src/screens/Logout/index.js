import { Redirect } from "react-router";

const Logout = () => {
    localStorage.removeItem('user');
    
    return <Redirect to="/sign-in" />;
};

export default Logout;
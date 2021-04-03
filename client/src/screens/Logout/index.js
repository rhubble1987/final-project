import { useEffect } from "react";
import { Redirect } from "react-router";

const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('user');
    }, []);    
    return <Redirect to="/sign-in" />;
};

export default Logout;
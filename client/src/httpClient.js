import axios from "axios";

export const httpClient = axios.create({

    baseURL: "/"

})

export const requestWithJWT = ()=>{
    var user = localStorage.getItem("user");
    if(!user){
        throw new Error("No User Logged In");
    }
    user = JSON.parse(user);
    console.log(user);

    return axios.create({
        baseURL: "/",
        headers: {
            Authorization: "Bearer " + user.jwt
        } 
    })
}


export const createUser = (userCredentials) => {
    const route = "/api/users/sign-up";
    return httpClient.post(route, userCredentials)
        .then(response => ({ status: true, data: response.data }))
        .catch(err => {
            return ({status: false, data: err.response.data.status})
        });
}

export const loginUser = (userCredentials) => {
    const route = "/api/users/signin";
    return httpClient.post(route, userCredentials)
        .then(response => ({ status: true, data: response.data }))
        .catch(err => {
            return ({status: false, data: err.response.data.status})
        });
}
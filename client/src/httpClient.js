import axios from "axios";

export const httpClient = axios.create({
    baseURL: "http://localhost:3005/"
})

export const requestWithJWT = ()=>{
    var user = localStorage.getItem("user");
    if(!user){
        throw new Error("No User Logged In");
    }
    user = JSON.parse(user);
    console.log(user);

    return axios.create({
        baseURL: "http://localhost:3005",
        headers: {
            Authorization: "Bearer " + user.jwt
        } 
    })
}
Promise.resolve().then(()=>{
    return requestWithJWT().get("/secret")
}).then((response)=>{
    console.log("req-jwt-success:", response)
}).catch((err)=>{
    console.error("req-jwt-failure:",err)
})


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



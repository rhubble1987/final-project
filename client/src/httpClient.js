import axios from "axios";

export const httpClient = axios.create({
    baseURL: "http://localhost:3005"
})

export const createUser = (userCredentials) => {
    const route = "/api/sign-up";
    return httpClient.post(route, userCredentials)
        .then(response => ({ status: true, data: response.data }))
        .catch(err => {
            return ({status: false, data: err.response.data.status})
        });
}

export const loginUser = (userCredentials) => {
    const route = "/api/signin";
    return httpClient.post(route, userCredentials)
        .then(response => ({ status: true, data: response.data }))
        .catch(err => {
            return ({status: false, data: err.response.data.status})
        });
}

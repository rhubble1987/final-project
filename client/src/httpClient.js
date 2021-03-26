import axios from "axios";

export const httpClient = axios.create({
    baseURL: "http://localhost:3005"
})

export const createUser = (userData) => {
    const route = "/api/sign-up";
    return httpClient.post(route, userData)
}

export const loginUser = (userCredentials) => {
    const route = "/api/users";
    return httpClient.post(route, userCredentials)
}
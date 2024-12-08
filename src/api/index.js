import axios from "axios";

const API = axios.create({
    baseURL:'https://genailabs-backend-dev.azurewebsites.net'
})

export const loginAPI = (email,password) => API.post("/api/auth/login", { email, password });
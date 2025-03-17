import axios from "axios"


export const axiosSetup = axios.create({
    baseURL: `http://localhost:9999/api/`,
    withCredentials: true
})
import axios from "axios"

export const axiosSetup = axios.create({
    baseURL: import.meta.env.MODE === "development" ? import.meta.env.VITE_API_URL : "/api",
    withCredentials: true
})

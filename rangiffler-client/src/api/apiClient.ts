import axios from "axios";

export const apiClient = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    }
});

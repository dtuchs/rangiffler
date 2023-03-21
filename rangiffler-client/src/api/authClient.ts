import axios from "axios/index";
import { AUTH_URL } from "./config";

export const authClient = axios.create({
    baseURL: AUTH_URL,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
    }
});

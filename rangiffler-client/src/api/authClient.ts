import axios from "axios";
import { CLIENT, SECRET } from "./config";

export const authClient = axios.create({
    baseURL: process.env.REACT_APP_AUTH_URL,
    headers: {
        "Content-type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${CLIENT}:${SECRET}`).toString("base64")}`,
    }
});

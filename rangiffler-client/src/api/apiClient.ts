import axios from "axios";
import {GATEWAY_URL} from "./config";

const token = sessionStorage.getItem("id_token");

export const apiClient = axios.create({
  baseURL: GATEWAY_URL,
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json",
    'Authorization': `Bearer ${token}`,
  }
});

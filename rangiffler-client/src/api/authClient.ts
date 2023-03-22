import axios from "axios";
import {CLIENT, SECRET} from "./config";
import {Buffer} from "buffer";

export const authClient = axios.create({
  baseURL: "http:127.0.0.1:9000",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Basic ${Buffer.from(`${CLIENT}:${SECRET}`).toString("base64")}`,
  }
});

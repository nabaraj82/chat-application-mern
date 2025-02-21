import axios from "axios";
import { baseURL } from "./APIRoutes";


export const axiosInstance = axios.create({
    baseURL:baseURL,
})
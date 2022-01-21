import axios from "axios"
import { getToken } from "./local-storage"


export const httpClient = axios.create({
    baseURL: "/api",
    headers: {
        'x-api-key': getToken()
    }
})









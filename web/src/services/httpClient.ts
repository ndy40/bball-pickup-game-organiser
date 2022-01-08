import axios from "axios"


const httpClient = axios.create({
    baseURL: "/api",
    headers: {
        'x-api-key': localStorage.getItem("token") || ""
    }
})


export default httpClient






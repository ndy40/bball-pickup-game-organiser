import axios from "axios"
const BASE_URL = '/api/users'

export const login = async (input) =>await axios.post(BASE_URL,input);
export const getProfile = async()=>  await axios.get(`${BASE_URL}/profile`,{
        headers:{ 'x-api-key':JSON.parse(localStorage.getItem('token')) || null }
    })

   

    
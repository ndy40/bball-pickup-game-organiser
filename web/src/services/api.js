import axios from "axios";

const http = axios.create({
    baseURL: '/api',
    headers:{ 'x-api-key':JSON.parse(localStorage.getItem('token')) || null }
  });

  

export const register = async (input) =>await http.post('/users',input);
export const getProfile = async()=>  await http.get('/users/profile')
export const login = async (input) =>await http.post('/users/login',input);


   

    
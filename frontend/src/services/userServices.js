import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true

export const registerUserAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/register`,data)   
    
    return response.data
}

export const loginUserAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/users/login`,data, {
        withCredentials: true, 
    })
    return response.data
}

export const logoutAPI=async(data)=>{
    const response=await axios.delete(`${BASE_URL}/users/logout`)
    return response.data
}


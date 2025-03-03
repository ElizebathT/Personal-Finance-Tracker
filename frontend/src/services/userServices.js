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

export const addTransactionAPI=async(data)=>{
    const response=await axios.post(`${BASE_URL}/transaction/add`,data, {
        withCredentials: true, 
    })
    return response.data
}

export const viewTransactionAPI=async(data)=>{
    console.log('hi');
    const response=await axios.get(`${BASE_URL}/transaction/viewall`)
    console.log('hi');
    
    return response.data
}
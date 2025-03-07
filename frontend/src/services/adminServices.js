import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";

export const dashboardAPI=async()=>{
    const userToken=getToken()  
    const response=await axios.get(`${BASE_URL}/admin/dashboard`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

export const verifyUserAPI=async(data)=>{
    const userToken=getToken()  
    const response=await axios.put(`${BASE_URL}/admin/verify/${data}`,{},{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    return response.data
}

import axios from'axios'
import { BASE_URL } from "../utils/urls"
axios.defaults.withCredentials = true
import { getToken } from "../utils/storageHandler";

export const dashboardAPI=async()=>{
    const userToken=getToken()  
    console.log('ok');
    
    const response=await axios.get(`${BASE_URL}/admin/dashboard`,{
        headers:{
            Authorization: `Bearer ${userToken}`
        }
    })
    console.log(response);
    
    return response.data
}

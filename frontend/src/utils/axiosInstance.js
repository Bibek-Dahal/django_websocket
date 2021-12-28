import axios from 'axios'
import { MyContext } from '../context/AuthContext'
import dayjs from 'dayjs'
import jwt_decode from "jwt-decode";
export const baseURL="http://127.0.0.1:8000/api"
export const axiosinstance = axios.create({
    baseURL:baseURL,
    headers:{ 'Content-Type':'application/json'}
})

axiosinstance.interceptors.request.use(async (req)=> {
    const token = JSON.parse(localStorage.getItem('authToken')) 
    req.headers.Authorization = `Bearer ${token?.access}`;
    
    const {exp} = jwt_decode(token.access)
    if(exp - dayjs().unix() <1){
        console.log('token expired man')
        const options = {
          headers:{'Content-Type':'application/json'}
        }
        const data = JSON.stringify(
          {
            refresh:token.refresh
          }
        )
        const res = await axios.post(`${baseURL}/token/refresh/`,data,options)
        try{
          console.log("new token",res.data)
          localStorage.setItem('authToken',JSON.stringify({...token,access:res.data.access}))
          req.headers.Authorization = `Bearer ${res.data.access}`;
        }catch(error){
          console.log(error)
        }
        

    }

    // //console.log(req.headers.Authorization)
    // const res =  await axios.post(`${baseURL}token/refresh/`,{refresh:token.refresh})
    return req;
  });
export default axiosinstance
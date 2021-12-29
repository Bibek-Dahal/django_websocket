import {createContext,useState} from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axiosinstance from '../utils/axiosInstance'
import axios from 'axios'
import {baseURL} from '../utils/axiosInstance'

export const MyContext = createContext()


const AuthContextProvider = ({children}) => {
    const token_status = JSON.parse(localStorage.getItem('authToken'))
    const [user, setuser] = useState(token_status?jwt_decode(token_status.access):null)
    const [authtoken, setauthtoken] = useState(token_status)
    const navigate = useNavigate()
    const login = async (e)=>{
        e.preventDefault()
        console.log(e.target.name.value)
        
        const options = {
            headers: {'Content-Type': 'application/json'}
        }
        const data =JSON.stringify({username:e.target.name.value,password:e.target.password.value})
        try{
            const res = await axios.post(`${baseURL}/token/`,data,options)
            if(res.status === 200){
                setuser(jwt_decode(res.data.access))
                setauthtoken(res.data)
                localStorage.setItem('authToken',JSON.stringify(res.data))
                console.log(user)
                navigate('/')
            }
        }catch(error){
            console.log(error.response.data)
        }   
    }
    
    
    const context_data = {
        user:user,
        token:authtoken,
        login:login
    }

    
    
    return (
        <MyContext.Provider value={context_data}>
            {children}
        </MyContext.Provider>
    );
}

export default AuthContextProvider

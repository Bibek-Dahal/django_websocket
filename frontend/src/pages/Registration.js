import React from 'react'
import {useState,useContext} from 'react'
import axios from 'axios'
import {baseURL} from '../utils/axiosInstance.js'
import { Navigate,useNavigate} from "react-router-dom";
import { MyContext} from '../context/AuthContext'

const Registration = () => {
    const {user,login} = useContext(MyContext)
    const [inputs, setinputs] = useState({first_name:"",last_name:""})
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const name = e.target.name
        const value = e.target.value
        setinputs((values)=>({...values,[name]:value}))
    
    }
    const handleSubmit = async (e)=>{
        console.log(inputs)
        const options = {
            headers:{'Content-Type':'application/json'}
        }
        e.preventDefault()
        try{
            const res = await axios.post(`${baseURL}/users/`,JSON.stringify(inputs),options)
            console.log(res)
            if(res.status == 201){
                navigate('/login')
            }
            
        }catch(error){
            console.log(error.response.data)
        }
        
        console.log('login clicked')
    }

    return (
        <div>
            {user!=null &&<Navigate to = "/"/>}
            <form onSubmit={handleSubmit} method="post">
                Username: <input type="text" name="username" value={inputs.username}  onChange={handleChange}/>
                Email: <input type="text" name="email" value={inputs.email} onChange={handleChange}/>
                First Name: <input type="text" name="first_name" value={inputs.first_name} onChange={handleChange}/>
                Last Name: <input type="text" name="last_name" value={inputs.last_name} onChange={handleChange}/>
                Password:<input type="password" name="password" value={inputs.password} onChange={handleChange}/>
                Confirm Password: <input type="password" name="password2" value={inputs.password2} onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
            

        </div>
    )
}

export default Registration

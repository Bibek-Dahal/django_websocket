
import {useState,useEffect,useContext} from 'react'
import { MyContext} from '../context/AuthContext'
import {Navigate} from 'react-router-dom'

const Login = () => {
    const {user,login} = useContext(MyContext)
   
    const [val, setval] = useState( {
        name:"",
        password:""
    })
    const handleChange = (e)=>{
        setval({...val,[e.target.name]:e.target.value})
        // console.log(e.target.value)
    }
   
    
    return (
        <div>
            {user!=null &&<Navigate to = "/"/>}
            <h1>Login</h1>
            <form onSubmit={login} method="post">
                Name: <input type="text" name="name" value={val.name}  onChange={handleChange}/><br/><br/>
                Password: <input type="password" name="password" value={val.password} onChange={handleChange}/>
                <button type="submit">Login</button>
                
            </form>
            {user?.user}
            
        </div>
    )
}

export default Login

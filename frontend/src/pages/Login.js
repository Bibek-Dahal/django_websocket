
import {useState,useContext} from 'react'
import { MyContext} from '../context/AuthContext'

const Login = () => {
    const {login} = useContext(MyContext)
    
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
            <form onSubmit={login} method="post">
                Name: <input type="text" name="name" value={val.name}  onChange={handleChange}/>
                Password: <input type="password" name="password" value={val.password} onChange={handleChange}/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login

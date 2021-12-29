import {React,useContext} from 'react'
import {Link} from 'react-router-dom'
import Login from '../pages/Login.js'
import { MyContext} from '../context/AuthContext'


const Nav = () => {
    const {user,login} = useContext(MyContext)
    return (
        <div>
            {user&&<>
                <Link to="/">Home</Link> <span> | </span>
                {user!=null?<Link to="/logout">logout</Link>:<Link to="/signup">signup</Link>}<span> | </span>
                {user===null&&<Link to="/login">Login</Link>}<span> | </span>
                <Link to="/about">About</Link><span> | </span>
                <Link to="/post">Post</Link><span> | </span>
            </>
            }
            
           
        </div>
    )
}

export default Nav

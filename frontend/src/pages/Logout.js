import {React,useContext} from 'react'
import {Navigate} from 'react-router-dom'
import { MyContext} from '../context/AuthContext'

const Logout = () => {
    const {setuser,setauthtoken }  = useContext(MyContext)
    localStorage.removeItem('authToken')
    setuser(null)
    setauthtoken(null)
    return (
        <div>
            <Navigate to ="/login"/>
        </div>
    )
}

export default Logout

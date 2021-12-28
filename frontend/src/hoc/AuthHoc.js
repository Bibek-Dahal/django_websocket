import {useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {MyContext} from '../context/AuthContext'

const AuthHoc = ({children}) => {
    console.log("inside auth hoc")
    const {user} = useContext(MyContext)
    console.log(user)
    return (
        <>
            {user==null?<Navigate to="/login"/>:children}
        </>   
    )
}

export default AuthHoc

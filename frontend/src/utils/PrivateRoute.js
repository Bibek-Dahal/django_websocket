import React from 'react'
import Homepage from '../pages/Homepage'
import {Navigate,Route} from 'react-router-dom'
import AuthHoc from '../hoc/AuthHoc'

const PrivateRoute = () => {
    const user = "bibek"
    console.log(user)
    return (
        <>
            <AuthHoc comp="<Homepage/>" />
        </>
    )
}

export default PrivateRoute

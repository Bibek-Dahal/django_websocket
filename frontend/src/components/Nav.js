import React from 'react'
import {Link} from 'react-router-dom'
import Login from '../pages/Login.js'

const Nav = () => {
    return (
        <div>
            <Link to="/">Home</Link> <span> | </span>
            <Link to="/signup">signup</Link><span> | </span>
            <Link to="/login">Login</Link><span> | </span>
            <Link to="/about">About</Link><span> | </span>
            <Link to="/post">Post</Link><span> | </span>
           
        </div>
    )
}

export default Nav

import React from 'react'
import {useState,useEffect} from 'react'
import Homepage from './pages/Homepage';
import Login from './pages/Login';

import Post from './pages/Post';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
  
} from "react-router-dom";
import Nav from './components/Nav';
import AuthHoc from './hoc/AuthHoc';
import AuthContextProvider from './context/AuthContext'
import Registration from './pages/Registration';
import About from './pages/About.js'

function App() {
  return (
    <div>
      <Router>
        <AuthContextProvider>
          <Nav/>
          <Routes>
            <Route path="/" element={<AuthHoc><Homepage/></AuthHoc>}></Route>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Registration/>}/>
            <Route path="/about" element={<AuthHoc><About/></AuthHoc>}></Route>
            <Route path="/post" element={<AuthHoc><Post/></AuthHoc>}></Route>
          </Routes>
        </AuthContextProvider> 
      </Router>
      
      
    </div>
    
  );
}

export default App;

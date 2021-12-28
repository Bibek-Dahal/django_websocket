import React from 'react'
import {useState} from 'react'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import About from './pages/About';
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


function App() {
  const [isClicked, setisClicked] = useState(false)
  const handleClick = (e)=>{
    e.preventDefault()
    setisClicked(true)
  }
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
      <form>
      <button onClick={handleClick}>click me</button>
      </form>
      {
        isClicked==true && <About/>

        
      }
        <About/>
    </div>
    
  );
}

export default App;

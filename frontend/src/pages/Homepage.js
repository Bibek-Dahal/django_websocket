import {useState,useContext,useEffect} from 'react'
import { MyContext } from '../context/AuthContext'
import axiosinstance from '../utils/axiosInstance'
import {useNavigate} from 'react-router-dom'
import dayjs from 'dayjs'
import About from './About.js'

const Homepage = () => {
    const [isClicked, setisClicked] = useState(false)
    const [blog, setblog] = useState(null)
    const [msg,setmsg] = useState(null)
    const [ws,setws] = useState(null)
    const {token,user} = useContext(MyContext)
    const navigate = useNavigate()
    const handleClick = (e)=>{
        e.preventDefault()
        setisClicked(true)
      }
    

    const blogs = async ()=>{

        // axiosinstance.defaults.headers.common['authorization'] = `Bearer ${token.access}`
        try{
            
            const res = await axiosinstance.get('blog')
            console.log("hello request secceded")
            if(res.status == 401){
                console.log("hello ddjffd ")
                navigate('/login')
            }
            console.log(res.data)
            setblog(res.data)

        }catch(error){
            console.log("error occourred",error)
        }
    }
    const sendMsg = ()=>{
        ws.send(JSON.stringify({
            'type':'msg',
            'message': 'hello i am bibek'
        }));

    }

    useEffect(()=>{
        console.log("home comp mount")
        blogs()
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${user.user}/`)
        setws(ws)

        ws.onopen = () => {
            // on connecting, do nothing but log it to the console
            console.log('connected')
            }

        ws.onmessage = evt => {
            // listen to data sent from the websocket server
            const msg = JSON.parse(evt.data)
            console.log(msg)
            setmsg(msg.message)
            // console.log(msg)
        }
    
            
            return () => {
                ws.close()
                console.log('home comp unmount')
            }    
    },[])
 
    
    return (
        
        <div>
            <h1>Home Page</h1>
        {
            isClicked==true && <About/> 
        }
        <form>
            <button onClick={handleClick}>click me</button>
        </form>
            {<h1>{msg}</h1>}
            {user.user}
            
            {
                blog!=null &&  blog.map((item,index)=>
                <ul>
                    <li key={item.id}><h1>{item.title}</h1><hr/></li>
                    <li key={index}>{item.description}</li>
                    <li>{item.blogImgs.length}</li>

                    {item.blogImgs.map((item,index)=>
                    <li>
                        <img src={item.image}/>
                    </li>
                    )}
                    
                </ul>)
            }   
            <button onClick={sendMsg}> Send Msg</button>
        </div>
    )
}

export default Homepage

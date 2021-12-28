import React from 'react'
import {useState,useContext} from 'react'
import { MyContext } from '../context/AuthContext'
import axiosInstance from '../utils/axiosInstance';
const Post =  () => {
    const {token,user} = useContext(MyContext)
    const [inputs, setinputs] = useState({title:"",description:""})
    const [images,setimages] = useState(null)
    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log(e.target.title.value)
        console.log(e.target.description.value)
        const data = {
            author:user.user_id,
            title:inputs.title,
            description:inputs.description,
            files:images.image
        }
        // console.log(data)
        // console.log(data.files)
        try{
            let formData = new FormData()
            formData.append('author',user.user_id)
            formData.append('title',inputs.title)
            formData.append('description',inputs.description)

            // formData.append('files',images.img)
            for(var i=0;i<Object.keys(images.img).length;i++){
                // console.log(images.img[i])
                formData.append("files", images.img[i]);
            }
            // const res = await axiosInstance.post('blog/',JSON.stringify(data))
            const res = await axiosInstance.post('add/',formData, {
                headers:{'Content-Type':'application/x-www-form-urlencoded'}
              })
            console.log(res)
        }catch(error){
            console.log(error.response.data)
        }
        
        setinputs({title:"",description:""})
    }
    const handleChange = (e)=>{
        console.log(user.user_id)
        const name = e.target.name
        const value = e.target.value
        setinputs((values)=>({...values,[name]:value}))

    }
    const handleFile = (e)=>{
        console.log('hello')
        
       
        console.log(Object.keys(e.target.files))
       let keys = e.target.files
        
        setimages({img:e.target.files})
        // console.log('img obj',images)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title:
                    <input type="text"  name='title' value={inputs.title} onChange={handleChange}/>
                </label>
                <label>Description:
                    <input type="text" required name='description' value={inputs.description} onChange={handleChange}/>
                </label>
                <label>Images:
                    <input type="file" enctype='multipart/form-data' id="img" multiple name="files"  onChange={handleFile} accept="image/*"/>
                </label>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Post

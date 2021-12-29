import {useEffect} from 'react'
const About = () => {
    useEffect(() => {
        console.log('component didmount called')
        return () => {
            console.log('component unmount called')
        }
    }, [])
    return (
        <div>
            <h1>Hello i am about page.</h1>
        </div>
    )
}

export default About

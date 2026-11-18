import React, { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


const Sign_up = () => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [loading,setLoading] = useState(false)
    const [password,setPassword] = useState('')
    const api_url = import.meta.env.VITE_API_URL

    const navigate = useNavigate()

    const handleSubmit = async () => {
    try {
        setLoading(true);
        const res = await axios.post(
            `${api_url}/api/user/register`,
            { name, email, password }
        );

        console.log(res.data);

        if (res.data.success) {
            alert("User registered Successfully");
            setLoading(false);
            navigate('/login')
        } else {
            alert(res.data.message);
        }

    } catch (error) {
        console.log(error);
        setLoading(false);
        alert(error.response?.data?.message || "Something went wrong");
    }
}
  return (
    <>
    <h1>Sign Up Here</h1>
    <input type='text' name='name' placeholder='enter your name' value={name} onChange={(e)=>setName(e.target.value)}></input><br />
    <input type='email' name='email' placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br />
    <input type='password' name='password' placeholder='enter your name' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br />
    <button onClick={handleSubmit}>{
        loading? "Signup...":"Signup"
    }</button><br />
    </>
  )
}

export default Sign_up
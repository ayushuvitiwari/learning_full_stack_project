import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Sign_up = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] = useState(false)
    const api_url = import.meta.env.VITE_API_URL
    const navigate = useNavigate()

    const handleSubmit = async () => {
        
    try {
        setLoading(true);
        const res = await axios.post(
            `${api_url}/api/user/login`,
            { email, password }
        );

        console.log(res.data);

        if (res.data.success) {
            localStorage.setItem('token',res.data.token)
            alert("Login Successfully");
            navigate('/profile')
            setLoading(false);
        } else {
            alert(res.data.message);
        }

    } catch (error) {
        console.log(error);
        setLoading(false);
        alert(error.response?.data?.message || "Something went wrong");
    }
    finally {
        setLoading(false);
    }
}
  return (
    <>
    <h1>Login Up Here</h1>
    <input type='email' name='email' placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br />
    <input type='password' name='password' placeholder='enter your name' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br />
    <button onClick={handleSubmit}>
        {loading ? "Logging in..." : "Login"}
    </button><br />
    </>
  )
}

export default Sign_up
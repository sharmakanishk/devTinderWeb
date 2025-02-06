import React, {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail]= useState("virat@gmail.com")
    const [password, setPassword]= useState("Virat@123")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleClick(){
        const res = await axios.post
        ("http://localhost:7777/login", {email, password}, { withCredentials: true });
        console.log(res.data)
        dispatch(addUser(res.data))
        navigate("/")
    }

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse w-xl">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="fieldset-label">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label className="fieldset-label">Password</label>
            <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <div><a className="link link-hover">Forgot password?</a></div>
            <button className="btn btn-neutral mt-4" onClick={handleClick}>Login</button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;

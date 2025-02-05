import React, {useState} from 'react'
import axios from 'axios'

const Login = () => {
    const [email, setEmail]= useState("virat@gmail.com")
    const [password, setPassword]= useState("Virat@123")

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
            <button className="btn btn-neutral mt-4" onClick={()=>{
                axios.post("http://localhost:7777/login", {email, password}, { withCredentials: true })
            }}>Login</button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;

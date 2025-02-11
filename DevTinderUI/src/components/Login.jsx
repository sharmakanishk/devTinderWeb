import React, {useState} from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants/const'

const Login = () => {
  const [toggle, setToggle] = useState(true)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail]= useState("")
    const [password, setPassword]= useState("")
    const [wrongCred, setWrongCred] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleLogin(){
        try{
            const res = await axios.post
            (BASE_URL+"/login", {email, password}, { withCredentials: true });
            dispatch(addUser(res.data))
            navigate("/")
        }catch(err){
            setWrongCred(err.response.data)
            console.log(err.message)
        }      
    }
    async function handleSignup(){
      try{
        const res=await axios.post(BASE_URL+"/signup",{firstname, lastname, email, password}, {withCredentials: true});
        dispatch(addUser(res.data));
        navigate("/profile")
      }catch(err){
        setWrongCred(err.response.data)
        console.log(err.response)
      }
    }

  return (
    <div className="hero bg-base-200 min-h-screen">
    <div className="hero-content flex-col lg:flex-row-reverse w-xl">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
            <fieldset className="fieldset">
            {toggle && 
            <div>
            <label className="fieldset-label">Firstname</label>
            <input type="text" className="input" placeholder="Firstname" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
            <label className="fieldset-label">Lastname</label>
            <input type="text" className="input" placeholder="Lastname" value={lastname} onChange={(e)=>setLastname(e.target.value)}/>
            </div>}

            <label className="fieldset-label">Email</label>
            <input type="email" className="input" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <label className="fieldset-label">Password</label>
            <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <div><a className="link link-hover">Forgot password?</a></div>
            <div><a className="link link-hover my-2 font-bold" onClick={()=>setToggle(!toggle)}>{toggle ? "Already registerd? Login ":"New User? Sign Up"}</a></div>
            <div><p className='text-red-500'>{wrongCred}</p></div>
            <button className="btn btn-neutral mt-4" onClick={toggle ? handleSignup:handleLogin}>{toggle ? "Signup":"Login"}</button>
          </fieldset>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login;

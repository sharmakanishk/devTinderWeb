import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../constants/const';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const user = useSelector(store => store.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogout = async ()=>{
        try{
            await axios.post(BASE_URL+"/logout", {}, {withCredentials:true})
            dispatch(removeUser())
            navigate("/login")
        }catch(err){
            console.log(err.message)
        }
    }
  return (
    <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">devTinder</a>
                        </div>
                            {user && <div className="flex gap-2 items-center mx-4">
                            <div>{"Welcome "+ user.firstname}</div>
                            <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img
                            alt="Tailwind CSS Navbar component"
                            src={user.profilepic} />
                        </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                </div>
            </div>}
    </div>
  )
}

export default NavBar;

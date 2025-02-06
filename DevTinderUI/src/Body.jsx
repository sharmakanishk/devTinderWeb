import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Feed from "./Feed";
import { useDispatch } from "react-redux";
import { addUser } from "./utils/userSlice";
import axios from "axios";
import { BASE_URL } from "./constants/const";
import Toast from "./Toast";

const Body = ()=>{
    const [errorMessage, setErrorMessage]= useState(null);
    const [toast, setToast]= useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const fetchUser = async ()=>{
        try{
            const userData = await axios.get(BASE_URL+"/profile",{withCredentials:true});
            dispatch(addUser(userData.data));
        }catch(err){ 
            if(err.status === 401){
                setErrorMessage(err.response.data)
                setToast(true)
                navigate("/login")
            }
            console.log(err.message)
        }
    }
    useEffect(()=>{
        if(toast){
            const timer=setTimeout(()=>{
                setToast(false) 
                setErrorMessage(null)
            }, 3000)
            return ()=>clearTimeout(timer);
        }
       
    },[toast])
    useEffect(()=>{
        fetchUser()
    },[])
    return (
        <>
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
        {toast && <Toast error={errorMessage}/>}
        </>
    )
}

export default Body;
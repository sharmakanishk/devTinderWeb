import axios from "axios"
import React, { useEffect , useState} from "react"
import { BASE_URL } from "../constants/const"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addRequest } from "../utils/requestSlice"
import RequestCard from "./RequestCard"

const Request = ()=>{
    const [error, setError] = useState(null);
    const requests = useSelector(store=>store.request)
    const dispatch = useDispatch()
    const getRequest= async ()=>{
        try{
            const res = await axios.get(BASE_URL+"/user/connection/request", {withCredentials:true})
            dispatch(addRequest(res.data))
        }catch(err){
            console.log(err)
            setError(err.response?.data?.message || "Failed to load requests.");
        }
        
    }
    useEffect(()=>{
        getRequest()
    },[])
    if(requests && requests.length === 0){
        return (
            <h1>No Requests yet!</h1>
        )
    }
    if(error){
        return <h1 className="text-white-500 text-center">{error}</h1>; 
    }
     return (
        <div>
            <div className="flex justify-center font-bold text-2xl">
                <h1>Requests</h1>
            </div>
            {requests && requests.map((request)=><RequestCard key={request._id} userInfo = {request}/>)}
        </div>
     )
}

export default Request
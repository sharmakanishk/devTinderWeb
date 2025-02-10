import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../constants/const'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'
import ConnectionCard from './ConnectionCard'

const Connection = () => {
    const connection = useSelector(store=> store.connection)
    console.log(connection)
    const dispatch = useDispatch()
    const getConnections=async ()=>{
        const res = await axios.get(BASE_URL+"/user/connection",{withCredentials:true})
        dispatch(addConnection(res.data.data))
    }
    useEffect(()=>{
        getConnections()
    },[])

  return (
    <div className='items-center justify-center'>
        <div className='my-2 flex justify-center'><h2 className='text-white'>Connections</h2></div> 
        {(connection == null) ? (<h1>Loading...</h1>) : 
        connection.map((object)=>
            (typeof object.fromUserId ==="object") ? 
             <ConnectionCard key={object.fromUserId._id} userInfo={object.fromUserId}/>:  
             <ConnectionCard key={object.toUserId._id} userInfo={object.toUserId}/>
        )}
    </div>
  )
}

export default Connection

import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../constants/const';
import { useDispatch } from 'react-redux';
import { actOnRequest } from '../utils/requestSlice';

const RequestCard = ({userInfo}) => {
    const dispatch = useDispatch()
    const {firstname, lastname,profilepic, age, gender,about} = userInfo.fromUserId;
    const handleAccept = (id)=>{
         axios.post(BASE_URL+"/connect/review/accepted/"+id, {}, {withCredentials: true})
        dispatch(actOnRequest(id))
    }
    const handleReject =  (id)=>{
        axios.post(BASE_URL+"/connect/review/rejected/"+id, {}, {withCredentials: true})
        dispatch(actOnRequest(id))
    }
  return (
    <div className='my-2'>
        <div className="card card-side bg-base-300 shadow-sm ">
            <figure>
                <img
                src={profilepic}
                alt="Profile Pic" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstname + " " + lastname}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <div>
                    <button className="btn btn-primary mx-2" onClick={()=>handleReject(userInfo._id)}>Reject</button>
                    <button className="btn btn-secondary mx-2" onClick={()=>handleAccept(userInfo._id)}>Accept</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RequestCard

import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../constants/const';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const Card = ({data}) => {
    const dispatch =useDispatch()
    const {_id,firstname, lastname, age, gender, skills,about,profilepic} = data;
    const handleClick=async (userId, status)=>{
      try{
        await axios.post(BASE_URL+"/connect/"+status+"/"+userId, {}, {withCredentials: true})
        dispatch(removeUserFromFeed(userId));
      }catch(err){
          console.log(err)
      }
    }
  return (
    <div className="flex items-center justify-center min-h-screen">
     <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img
          src={profilepic}
          alt="ProfilePic" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstname + " " + lastname}</h2>
        {age && gender && <p>{age + ", "+ gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={()=>handleClick(_id, "ignored")}>Ignore</button>
          <button className="btn btn-secondary" onClick={()=>handleClick(_id, "interested")}>Interested</button>
        </div>
      </div>
  </div>
</div>
  )
}

export default Card

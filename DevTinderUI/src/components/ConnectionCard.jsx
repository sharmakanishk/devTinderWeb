import React from 'react'
import { Link } from 'react-router-dom'

const ConnectionCard = ({userInfo}) => {
    const {_id,firstname, lastname,profilepic, age, gender,about} = userInfo
  return (
    <div className='flex justify-center'>
    <div className='my-2 w-3xl' >
        <div className="card card-side bg-base-300 shadow-sm ">
            <figure>
                <img
                src={profilepic}
                alt="Profile Pic"
                className="w-20 h-20 mx-3 object-cover rounded-full" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstname + " " + lastname}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-end">
                    <Link to={"/chat/"+_id}><button className="btn btn-primary">Chat</button></Link>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ConnectionCard

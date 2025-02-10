import React from 'react'

const ConnectionCard = ({userInfo}) => {
    const {firstname, lastname,profilepic, age, gender,about} = userInfo
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
            </div>
        </div>
    </div>
  )
}

export default ConnectionCard

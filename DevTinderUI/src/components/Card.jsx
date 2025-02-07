import React from 'react'

const Card = ({data}) => {
    const {firstname, lastname, age, gender, skills,about,profilepic} = data
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
          <button className="btn btn-primary">Ignore</button>
          <button className="btn btn-secondary">Interested</button>
        </div>
      </div>
  </div>
</div>
  )
}

export default Card

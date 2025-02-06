import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/const'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'

const Feed = () => {
  const dispatch = useDispatch()
  const feed = useSelector(store => store.feed)
  const fetchFeed = async ()=>{
    // if(feed)return
    const res = await axios.get(BASE_URL+"/feed",{withCredentials:true})
    dispatch(addFeed(res.data))
  }
  useEffect(()=>{
    fetchFeed()
  },[])
  return (
    <div className="flex items-center justify-center min-h-screen">
      {feed && <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img
            src={feed.Users[0].profilepic}
            alt="ProfilePic" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{feed.Users[0].firstname + " " + feed.Users[0].lastname}</h2>
          <p>{feed?.Users[0]?.skills}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
    </div>}
  </div>
  )
}

export default Feed

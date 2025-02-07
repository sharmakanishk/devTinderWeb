import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../constants/const'
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'

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
    <>
    {feed && <Card data={feed.Users[0]}/>}
    </>
  )
}

export default Feed

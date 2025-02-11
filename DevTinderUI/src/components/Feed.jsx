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
    const res = await axios.get(BASE_URL+"/feed",{withCredentials:true})
    dispatch(addFeed(res.data))
  }
  useEffect(()=>{
    fetchFeed()
  },[])
  if(!feed || feed.length ===0){
    return (<h1 className='flex justify-center my-3 '>No more users left</h1>)
  }
  return (
    <>
    
    {feed && feed.map((user)=>{
      return <Card key={user._id} data={user}/>
    })}
    </>
  )
}

export default Feed

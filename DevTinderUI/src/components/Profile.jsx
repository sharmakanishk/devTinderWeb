import React, { useState, useEffect } from 'react'
import Card from './Card'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../constants/const'
import { addUser } from '../utils/userSlice'
import Toast from './Toast'


const Profile = () => {
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()
    // Initialize with empty strings to prevent capturing null values
    const [updateMessage, setUpdateMessage] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('')
    const [about, setAbout] = useState('')
    const [profilepic, setProfilepic] = useState('')

    const handleSave = async ()=>{
        const updatedUser = await axios.patch(BASE_URL+"/profile/update/info",{
            firstname, lastname, age, gender, about, profilepic
        },{withCredentials:true});
        dispatch(addUser(updatedUser.data));
        setUpdateMessage(true)
    }
    // Update state only when `user` is fully loaded
    useEffect(()=>{
        if(updateMessage){
            const timer = setTimeout(()=>{
                setUpdateMessage(false)
            },2000);
            return ()=>clearTimeout(timer)
        }
    },[updateMessage])
    useEffect(() => {
        if (user) {
            setFirstname(user.firstname || '')
            setLastname(user.lastname || '')
            setAge(user.age || '')
            setGender(user.gender || '')
            setAbout(user.about || '')
            setProfilepic(user.profilepic || '')
        }
    }, [user]) // Runs whenever `user` updates
  return (
    <>
    {user && <div className='flex items-center m-4 justify-center'>
       <fieldset className="fieldset w-xs bg-base-300 border border-base-300 p-4 m-2 rounded-box">
            <legend className="fieldset-legend">Profile Update</legend>
            
            <label className="fieldset-label">Firstname</label>
            <input type="text" className="input" value={firstname} onChange={e=>setFirstname(e.target.value)}/>
            
            <label className="fieldset-label">Lastname</label>
            <input type="text" className="input" value={lastname} onChange={e=>setLastname(e.target.value)}/>

            <label className="fieldset-label">Age</label>
            <input type="number" className="input" value={age} onChange={e=>setAge(e.target.value)}/>

            <div className="flex flex-col gap-2">
                <label className="fieldset-label">Gender</label>
                <details className="dropdown">
                    <summary className="btn m-1 w-40">{gender || "Select Gender"}</summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box w-40 shadow-md">
                        <li><a onClick={() => setGender("male")}>male</a></li>
                        <li><a onClick={() => setGender("female")}>female</a></li>
                        <li><a onClick={() => setGender("others")}>others</a></li>
                    </ul>
                </details>
            </div>

            <label className="fieldset-label">Image URL</label>
            <input type="url" className="input" value={profilepic} onChange={e=>setProfilepic(e.target.value)}/>

            <fieldset className="fieldset">
            <legend className="fieldset-legend">About</legend>
            <textarea className="textarea h-24" value={about} onChange={e=>setAbout(e.target.value)}></textarea>
            </fieldset>

            <button className="btn btn-neutral mt-4" onClick={handleSave}>Save</button>
        </fieldset>
        <div>
            {user &&<Card data={{firstname, lastname, age, gender,about,profilepic}}/>}
        </div>
    </div>}
    {updateMessage && <Toast message="User updated Successfully"/>}
    </>
  )
}

export default Profile

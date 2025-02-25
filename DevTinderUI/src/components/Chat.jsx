import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import initializeSocket from "../utils/socketConnect"; 
import axios from "axios";
import { BASE_URL } from "../constants/const";


const Chat = () => {
    const [message, setMessage] = useState([])
    const [text, setText]=useState("")
    const { toUserId} = useParams()
    const user = useSelector(store=>store.user)
    const messagesEndRef = useRef(null);

    const id=user?._id;
    const firstname = user?.firstname;
    const getChat = async ()=>{
        try{
            const chat = await axios.get(BASE_URL+"/chat/"+toUserId, {withCredentials:true})
            if(chat.data.messages.length >0){
                const filteredMessage = chat?.data?.messages?.map(({userId,text})=>({id:userId,text}))
               setMessage(filteredMessage)
            }
        }catch(err){
            console.log(err.message)
        }
    }
    useEffect(()=>{
        if(!user)return
        getChat()
        const socket = initializeSocket()
        socket.emit("joinChat", {toUserId, firstname, id})
        socket.on("receivedMessage", ({id,text})=>{
            setMessage((message)=>[...message,{id,text}])
        })
        return ()=>socket.disconnect()
    },[toUserId, id, firstname]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [message]); // Scrolls to bottom when messages update

    const sendMessage = ()=>{
        if(!text.trim())return
        const socket = initializeSocket();
        socket.emit("sendMessage", {toUserId,firstname, id, text})
       
        setText("")
    }
    if(!user) return (<div>Loading...</div>)
        
    
  
    return (
      <div className="m-10 border-s-gray-300 box-border bg-zinc-900 w-3xl h-screen flex flex-col">
        {/* Header */}
        <div className="p-2 border border-gray-500 rounded-md flex justify-center items-center">
          <div className="chat chat-start flex items-center justify-center">
            <div className="chat-bubble bg-fuchsia-800">DevTinder</div>
          </div>
        </div>
  
        {/* Chat messages container */}
        <div className="flex-grow overflow-y-auto p-2 space-y-2">
          {message.length > 0 &&
            message.map((textMsg, index) => (
              <div key={index} className={(textMsg.id === id) ? "chat chat-end":"chat chat-start"}>
                <div className="chat-bubble bg-zinc-800 px-3 py-2 text-sm">{textMsg.text}</div>
              </div>
            ))}
          <div ref={messagesEndRef} /> {/* Keeps scroll at the bottom */}
        </div>
  
        {/* Input field at the bottom */}
        <div className="w-full p-3 bg-zinc-900 flex border-t border-gray-500">
          <input
            type="text"
            placeholder="Type here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input w-full border border-gray-500 rounded-md p-2 bg-zinc-800 text-white"
          />
          <button className="btn btn-primary mx-2" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  };


export default Chat

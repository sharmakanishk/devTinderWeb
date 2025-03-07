// import { useEffect, useState, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import initializeSocket from "../utils/socketConnect"; 
// import axios from "axios";
// import { BASE_URL } from "../constants/const";


// const Chat = () => {
//     const [isFirstLoad, setIsFirstLoad] = useState(true);
//     const chatContainerRef = useRef(null);
//     const [message, setMessage] = useState([])
//     const [text, setText]=useState("")
//     const { toUserId} = useParams()
//     const [page,setPage] = useState(1)
//     const user = useSelector(store=>store.user)
//     const messagesEndRef = useRef(null);
//     const handleScrollRef=useRef(null)

//     const id=user?._id;
//     const firstname = user?.firstname;
//     const getChat = async ()=>{
//         try{
//             const chat = await axios.get(BASE_URL+"/chat/"+toUserId+"/messages?page="+page, {withCredentials:true})
//             console.log(chat)
//             if(chat.data.length >0){
//                 const filteredMessage = chat?.data?.map(({userId,text})=>({id:userId,text}))
//                 setMessage((prev)=>[...prev,...filteredMessage])
//             }
//             if(chat.data.length > 0){
//                 setPage((page)=>page+1);
//             }
//         }catch(err){
//             console.log(err.message)
//         }
//     }
//     const handleScroll = () => {
//     if (!handleScrollRef.current || message.length === 0) return;

//     const chatContainer = handleScrollRef.current;

//     if (chatContainer.scrollTop === 0) {
//         // Step 1: Capture first visible message's ID before fetching
//         const firstVisibleMessage = chatContainer.firstElementChild;
//         const firstMessageId = firstVisibleMessage?.getAttribute("data-id");

//         getChat().then(() => {
//             // Step 3: Find the same message and restore its position
//             if (firstMessageId) {
//                 const newFirstMessage = document.querySelector(`[data-id="${firstMessageId}"]`);
//                 if (newFirstMessage) {
//                     newFirstMessage.scrollIntoView({ behavior: "instant" });
//                 }
//             }
//         });
//     }
// };

    
    

//     useEffect(()=>{
//         if(!user)return
//         getChat()
//         const socket = initializeSocket()
//         socket.emit("joinChat", {toUserId, firstname, id})
//         socket.on("receivedMessage", ({id,text})=>{
//             setMessage((message)=>[...message,{id,text}])
//         })
//         return ()=>socket.disconnect()
//     },[toUserId, id, firstname]);

//     useEffect(() => {
//         if (chatContainerRef.current) {
//             if (isFirstLoad) {
//                 // Make sure chat is fully visible on initial render
//                 chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight / 2; 
//                 setIsFirstLoad(false); // Disable after first render
//             } else {
//                 // Auto-scroll for new messages
//                 messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
//             }
//         }
//       }, [message]); // Scrolls to bottom when messages update

//     const sendMessage = ()=>{
//         if(!text.trim())return
//         const socket = initializeSocket();
//         socket.emit("sendMessage", {toUserId,firstname, id, text})
       
//         setText("")
//     }
//     if(!user) return (<div>Loading...</div>)
        
//         const setRefs = (element) => {
//             chatContainerRef.current = element;
//             handleScrollRef.current = element;
//         };
  
//     return (
//       <div className="m-10 border-s-gray-300 box-border bg-zinc-900 w-3xl h-screen flex flex-col">
//         {/* Header */}
//         <div className="p-2 border border-gray-500 rounded-md flex justify-center items-center">
//           <div className="chat chat-start flex items-center justify-center">
//             <div className="chat-bubble bg-fuchsia-800">DevTinder</div>
//           </div>
//         </div>
  
//         {/* Chat messages container */}
//         <div className="flex-grow overflow-y-auto p-2 space-y-2"
//         onScroll={handleScroll} ref={setRefs}>
//           {message.length > 0 &&
//             message.slice().reverse().map((textMsg, index) => (
//               <div key={index} className={(textMsg.id === id) ? "chat chat-end":"chat chat-start"}>
//                 <div className="chat-bubble bg-zinc-800 px-3 py-2 text-sm">{textMsg.text}</div>
//               </div>
//             ))}
//           <div ref={messagesEndRef} /> {/* Keeps scroll at the bottom */}
//         </div>
  
//         {/* Input field at the bottom */}
//         <div className="w-full p-3 bg-zinc-900 flex border-t border-gray-500">
//           <input
//             type="text"
//             placeholder="Type here..."
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             className="input w-full border border-gray-500 rounded-md p-2 bg-zinc-800 text-white"
//           />
//           <button className="btn btn-primary mx-2" onClick={sendMessage}>
//             Send
//           </button>
//         </div>
//       </div>
//     );
//   };


// export default Chat

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import initializeSocket from "../utils/socketConnect"; 
import axios from "axios";
import { BASE_URL } from "../constants/const";

const Chat = () => {
    const [fetchOlderMessage, setFetchOlderMessage]=useState(false)
    const [messages, setMessages] = useState([]); // Renamed from "message" to "messages"
    const [text, setText] = useState("");
    const { toUserId } = useParams();
    const [page, setPage] = useState(1);
    const user = useSelector(store => store.user);
    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const socketRef = useRef(null);

    const id = user?._id;
    const firstname = user?.firstname;

    const getChat = async () => {
        try {
            const chat = await axios.get(`${BASE_URL}/chat/${toUserId}/messages?page=${page}`, { withCredentials: true });

            if (chat.data.length > 0) {
                const formattedMessages = chat.data.map(({_id, userId, text }) => ({textId:_id, id: userId, text }));
                
                setMessages((prev) => [...prev, ...formattedMessages ]); // ✅ Add older messages at the top
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            console.log("Error fetching chat:", err.message);
        }
    };

    useEffect(() => {
        if (!user) return;

        getChat();

        if (!socketRef.current) {
            socketRef.current = initializeSocket();
        }
        const socket = socketRef.current;

        socket.emit("joinChat", { toUserId, firstname, id });

        socket.on("receivedMessage", ({textId ,id, text }) => {
            setMessages((prevMessages) => [{ textId, id, text }, ...prevMessages ]); // ✅ Append new messages at the bottom
        });

        return () => {
            socket.off("receivedMessage");
            socket.disconnect();
        };
    }, [toUserId, id, firstname]);

    useEffect(() => {
        if (chatContainerRef.current && fetchOlderMessage===false) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [messages]);

    const handleScroll = async () => {
        if (!chatContainerRef.current) return;

        const chatContainer = chatContainerRef.current;
        // ✅ Store scroll position before fetching older messages
        const prevHeight = chatContainer.scrollHeight;

        if (chatContainer.scrollTop === 0) {
            const firstMessage = chatContainer.firstElementChild;
            const firstElementId = firstMessage.getAttribute("data-id");
            setFetchOlderMessage(true)
            await getChat();
            requestAnimationFrame(() => {
                const newHeight = chatContainer.scrollHeight;
                chatContainer.scrollTop = newHeight - prevHeight;
            });
            setFetchOlderMessage(false)
        }
    };

    const sendMessage = () => {
        if (!text.trim()) return;

        if (socketRef.current) {
            socketRef.current.emit("sendMessage", { toUserId, firstname, id, text });
        }

        setText("");
    };

    if (!user) return (<div>Loading...</div>);

    return (
        <div className="m-10 border-s-gray-300 box-border bg-zinc-900 w-3xl h-screen flex flex-col">
            <div className="p-2 border border-gray-500 rounded-md flex justify-center items-center">
                <div className="chat chat-start flex items-center justify-center">
                    <div className="chat-bubble bg-fuchsia-800">DevTinder</div>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-2 space-y-2"
                
                onScroll={handleScroll} 
                ref={chatContainerRef}>
                {messages.slice().reverse().map((textMsg, index) => (
                    <div key={index} className={(textMsg.id === id) ? "chat chat-end" : "chat chat-start"}>
                        <div className="chat-bubble bg-zinc-800 text-amber-50 px-3 py-2 text-sm" data-id={textMsg.textId}>{textMsg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

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

export default Chat;



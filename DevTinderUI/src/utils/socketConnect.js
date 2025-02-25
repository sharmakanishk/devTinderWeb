import { io } from "socket.io-client";
import { BASE_URL } from '../constants/const';

const initializeSocket = ()=>{
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
    return  io(BASE_URL,{
        auth:{
            token,
        }
    });
}

export default initializeSocket
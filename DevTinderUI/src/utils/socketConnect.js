import { io } from "socket.io-client";
import { BASE_URL } from '../constants/const';

const initializeSocket = ()=>{
    const token = document.cookie
        .split("; ")
        .find(row => row.startsWith("token="))
        ?.split("=")[1];
        if(location.hostname === "localhost"){
            return  io(BASE_URL,{
                auth:{
                    token,
                }
            });
        }
        else{
            return io("/", {
                path:"/api/socket.io",
                auth:{token}
            })
        }
}

export default initializeSocket
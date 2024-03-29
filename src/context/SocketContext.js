import {createContext} from "react"
import { io } from 'socket.io-client';


const SocketContext=createContext({})

export const SocketProvider=({children})=>{
    
    const socket=io("https://buzz-backend-oyat.onrender.com",{
        autoConnect:false
    })
    // const socket=io("http://localhost:3500",{
    //     autoConnect:false
    // })

    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
        )
}
export default SocketContext
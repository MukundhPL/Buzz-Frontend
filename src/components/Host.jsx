import React,{useContext,useState} from 'react'
// import { io } from 'socket.io-client';
import HostForm from './HostForm';
import HostLobby from './HostLobby';
import SocketContext from '../context/SocketContext';
// const socket=io("ws://localhost:3500")
const Host = () => {
  const {socket}=useContext(SocketContext)

  // console.log(socket)
  const [currRoom,setRoom]=useState("")
  // socket.on("connection",(data)=>console.log(data))

  socket.on("hosting",(user)=>{
      // console.log(socket.id)
       setRoom(user.room)
      //  console.log(socket.id)
  })
  return (
    currRoom===""?<HostForm socket={socket} />:<HostLobby currRoom={currRoom} socket={socket}/>
  )
}

export default Host
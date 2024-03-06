import React,{ useContext, useState}from 'react'
import SocketContext from '../context/SocketContext';

import JoinForm from './JoinForm';
import Lobby from './Lobby';


const Join = () => {
    const {socket}=useContext(SocketContext)
    const [currRoom,setRoom]=useState("")
    const [name,setName]=useState("")
    const[Buzzed,setBuzzed]=useState([])
    const[Members,setMembers]=useState([])
    const[isLock,setLock]=useState(false)
    // socket.on("connection",(data)=>console.log(data))

    socket.on("joinedRoom",({room,name,members,buzzed,lock})=>{
        // console.log(socket.id)
        setRoom(room)
        setName(name)
        // console.log(socket.id)
        setMembers(members)
        setBuzzed(buzzed)
        setLock(lock)
    })

  return (
    currRoom===""?<JoinForm socket={socket}/>:<Lobby socket={socket} currRoom={currRoom} name={name} Buzzed={Buzzed} Members={Members} setBuzzed={setBuzzed} setMembers={setMembers} isLock={isLock} setLock={setLock} />

  )
}

export default Join
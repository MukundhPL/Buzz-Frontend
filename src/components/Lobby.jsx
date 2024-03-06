import React, { useState,useRef } from 'react'
import {  useNavigate } from "react-router-dom";
import Buzz from "./resources/Buzz.mp3"
const Lobby = ({currRoom,socket,name,Buzzed,Members,setBuzzed,setMembers,isLock,setLock}) => {
  const navigate=useNavigate()
  // const[Buzzed,setBuzzed]=useState([])
  // const[Members,setMembers]=useState([])
  
  const Sound=new Audio( Buzz)
  const playRef=useRef(null)
  const[isBuzz,setBuzz]=useState(false)
  
  socket.on("clear",(members)=>{
    setMembers(members)
    setBuzzed([])
    setBuzz(false)
  })
  socket.on("alert",(msg)=>{
    alert(msg)
})
  socket.on("newJoin",(data)=>{
    setMembers(data.members)
  })
  socket.on("update",({members,buzzed})=>{

    setBuzzed(buzzed)
    setMembers(members)
 
  })
  const buzz=()=>{
    console.log(Buzzed)
    if(playRef.current.checked)Sound.play()
    setBuzz(true)
    const data={room:currRoom,id:socket.id}
    socket.emit("buzzRoom",data)
  }
  socket.on("endGame",async(msg)=>{
    console.log(`${msg}`)
    alert(msg)
    setTimeout(()=>navigate("/"),2000);
  })
  socket.on("lock",()=>{
    setLock(!isLock)
  })
  window.addEventListener("beforeunload",(e)=>{
    e.preventDefault()
    socket.emit("leave",{name,room:currRoom})
    socket.emit("kick",{id:socket.id,room:currRoom,op:0})
  })
  return (
    <div className='wrapper'>
            <p className="title" style={{marginBottom:"5px"}}>Room : <span style={{color:"antiquewhite"}}>{`${currRoom}`}</span></p>
            <p className="title" style={{marginBottom:"25px",display:"flex"}}>Play Sound : <input type="checkbox" ref={playRef} defaultChecked={true} /></p>
            
              <button className="buzzer" style={isBuzz?{backgroundColor:"#7A0000",cursor:"not-allowed"}:isLock?{backgroundColor:"#F5B301",cursor:"not-allowed"}:{backgroundColor:"#046307"}} onClick={(!isBuzz&&!isLock)?buzz:null}>{isBuzz?"Buzzed":isLock?"Locked":"Buzz"}</button>
            
            <div className="blk list">
            <p className="title" style={{marginBottom:"5px"}}>Buzzed:</p>
            <ul>
            {Buzzed.map(x=>
              <li key={x.id}>
                <p className="item" style={{display:"flex"}} >{x.name} </p>
              </li>)}
            </ul>
          </div>
          <div className="blk list">
            <p className="title" style={{marginBottom:"5px"}}>Members:</p>
            <ul>
              {Members.map(x=>
              <li key={x.id}>
                <p className="item" style={{display:"flex"}} >{x.name} </p>
              </li>)}
            </ul>
          </div>
    </div>

  )
}

export default Lobby
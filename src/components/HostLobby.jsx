import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import X from "./resources/x.svg"

const HostLobby = ({currRoom,socket}) => {

  const navigate=useNavigate()
  const[isLock,setLock]=useState(false)
  const[Buzzed,setBuzzed]=useState([])
  const[Members,setMembers]=useState([])
  const update=({members,buzzed})=>{
    setBuzzed(buzzed)
    setMembers(members)
  }
  socket.on("alert",(msg)=>{
    alert(msg)
})
  const endGame=()=>{
    socket.emit("endGame",currRoom)
    navigate("/")
  }
  const newJoin=(data)=>{
    setMembers(data.members)
  }
  const clear=()=>{
    socket.emit("clearBuzz",currRoom)
    setMembers([...Members,...Buzzed])
    setBuzzed([])
  }
  const kick=(e,id)=>{
    e.stopPropagation()
    socket.emit("kick",{id:id,room:currRoom,op:1})
  }
  const userLeave= (e) =>{  
    e.preventDefault();
    endGame()
  }
  const lock=()=>{
    setLock(!isLock)
    
    socket.emit("lock",currRoom)
  }


  socket.on("update",update)
  socket.on("newJoin",newJoin)
  window.addEventListener("beforeunload",userLeave);

  return (
    <div className='wrapper'style={{marginTop:"35px"}}>
      <p className="title" style={{marginBottom:"5px"}}>Hosting Room : <span style={{color:"antiquewhite"}}>{`${currRoom}`}</span></p>
      <div className="blk">
        <button className='btn clear' onClick={()=>clear()}>Clear Buzzed</button>
        <button className='btn end' onClick={()=>endGame()}>End Game</button>
        <button className='btn' onClick={lock}>{isLock?"Unl":"L"}ock Buzzer</button>
      </div>
      <div className="blk list" >
        <p className="title" style={{marginBottom:"5px"}}>Buzzed:</p>
        <ul>
        {Buzzed.map(x=>
          <li key={x.id}>
            <p className="item" style={{display:"flex"}} >{x.name} 
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="x" viewBox="0 0 16 16" onClick={(e)=>{kick(e,x.id)}}>
                <title>Kick Player</title>
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
              </svg>
              </p>
          </li>)}
        </ul>
      </div>
      <div className="blk list">
        <p className="title" style={{marginBottom:"5px"}}>Members:</p>
        <ul>
          {Members.map(x=>
          <li key={x.id}>
            <p className="item" style={{display:"flex"}} >{x.name} 
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="x" width="100%" height="100%"viewBox="0 0 16 16" onClick={(e)=>{kick(e,x.id)}}>
              <title>Kick Player</title>
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
            </svg>
            </p>
          </li>)}
        </ul>
      </div>
    </div>
    )
}


export default HostLobby
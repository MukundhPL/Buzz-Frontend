import React,{useRef} from 'react'
import { useState } from 'react'
import "./Form.css"
const JoinForm = ({socket}) => {
    const [message,setMessage]=useState("")
    const [isLoading,setLoading]=useState(false)
    const alertUser=(msg)=>{
        setMessage(msg)
        const al= document.getElementById("al")
        al.showModal()
    }
    socket.on("alert",(msg)=>{
        alertUser(msg)
        setLoading(false)
    })
    socket.on("connect_failed",(e)=>{
        alertUser(`Connection failed, Please try again later!`)
        setLoading(false)
        socket.disconnect()
    })
    socket.on("connect_error",(err)=>{
        alertUser(`Connection failed, Please try again later!`)
        setLoading(false)
        socket.disconnect()
    })
    const room=useRef()
    const name=useRef()
    const joinLobby=(e)=>{
        e.preventDefault()

        if(room.current.value=="")alertUser("Please enter room name");
        else if(name.current.value=="")alertUser("Please enter display name");
        else{
            setLoading(true)
            socket.connect()
            // if(socket.connected!==true)alert("Not connected to server, Please Try Again Later")
            const user={
                id:socket.id,
                name:name.current.value,
                room:room.current.value
            }
            room.current.value=""
            name.current.value=""
            socket.emit("joinRoom",user)
        }   
    }
  return (
    <div>

        <div className='wrapper'>
            <dialog id="al">
                <p className='item alert'>Alert</p>
                <p className='item'>{message}</p>
                <form method='dialog'>
                    <button className='btn'>Close</button>
                </form>
            </dialog>
            {!isLoading?
                <form onSubmit={joinLobby}>
                    <p className='title heading'>Join Game</p>
                    <input placeholder=" Enter Room" type="text" ref={room} ></input>
                    <input placeholder=" Enter Name" type="text" ref={name} ></input>
                    <input type="submit"/>
                </form>
                :
                <p className='title heading' style={{color:"white"}}>Loading...</p>
            }   
        </div>
        
    </div>
  )
}

export default JoinForm
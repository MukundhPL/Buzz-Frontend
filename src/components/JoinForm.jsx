import React,{useRef} from 'react'
import "./Form.css"
const JoinForm = ({socket}) => {
    socket.on("alert",(msg)=>{
        alert(msg)
    })
    const room=useRef()
    const name=useRef()
    const joinLobby=(e)=>{
        e.preventDefault()

        if(room.current.value=="")alert("Please enter room name");
        else if(name.current.value=="")alert("Please enter display name");
        else{

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
            <form onSubmit={joinLobby}>
                <p className='title heading'>Join Game</p>
                <input placeholder=" Enter Room" type="text" ref={room} ></input>
                <input placeholder=" Enter Name" type="text" ref={name} ></input>
                <input type="submit"/>
            </form>
        </div>
    </div>
  )
}

export default JoinForm
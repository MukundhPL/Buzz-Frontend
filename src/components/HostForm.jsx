import React,{useRef} from 'react'
import "./Form.css"
const HostForm = ({socket}) => {
    socket.on("alert",(msg)=>{
        alert(msg)
    })
    const room=useRef()
    const hostLobby=(e)=>{
        e.preventDefault()

        if(room.current.value=="")alert("Please enter room name");
        else{
            socket.connect(()=>{
                if(!socket.connected){
                    alert("Not connected")
                    return
                }
            })
            const user={
                id:socket.id,
                room:room.current.value
            }
            room.current.value=""
    
            socket.emit("hostRoom",user)
        }   
        
    }
  return (
    <div className="wrapper">
        <form onSubmit={hostLobby}  >
                <p className='title heading'>Host Game</p>
                <input placeholder=" Enter Room" type="text" ref={room} />
                <input type="submit"/>

        </form>
    </div>
  )
}

export default HostForm
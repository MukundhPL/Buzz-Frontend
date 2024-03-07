import React,{useRef,useState} from 'react'
import "./Form.css"
const HostForm = ({socket}) => {
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
    const hostLobby=(e)=>{
        e.preventDefault()

        if(room.current.value=="")alertUser("Please enter room name");
        else{
            setLoading(true)
            socket.connect()
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
        <dialog id="al">
            <p className='item alert'>Alert</p>
            <p className='item'>{message}</p>
            <form method='dialog'>
                <button className='btn'>Close</button>
            </form>
        </dialog>
        {!isLoading?
        <form onSubmit={hostLobby}  >
                <p className='title heading'>Host Game</p>
                <input placeholder=" Enter Room" type="text" ref={room} />
                <input type="submit"/>

        </form>
        :
        <p className='title heading' style={{color:"white"}}>Loading...</p>}
    </div>
  )
}

export default HostForm
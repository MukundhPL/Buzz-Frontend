import React from 'react'
import {Link} from "react-router-dom"
const Home = () => {
  return (

    <div className="wrapper" style={{width:"100%"}}>
        <Link to="/join"><button className="big btn">Join Game</button></Link>
        <Link to="/host"> <button className="big btn">Host Game</button></Link>
        <p className="title" style={{marginBottom:"5px"}}>How to Play?</p>
        <ul>
          <li className='item'>The Host hosts the game with a specific name</li>
          <li className='item'>Players join the game with that name</li>
          <li className="title" style={{marginBottom:"5px"}}>Host Special powers:</li>
            <ul>
              <li className='item'>Can clear the buzzes</li>
              <li className='item'>Can lock the buzzer</li>
              <li className='item' >Can kick people out</li>
            </ul>
        </ul>
    </div>
  )
}

export default Home
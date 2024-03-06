import React from 'react'
import Buzz from "./resources/bee.svg"
const Nav = () => {
  return (
    <div className="navbar">
       <p> Buzz<img src={Buzz} width={35} height={45}/></p>
    </div>
  )
}

export default Nav
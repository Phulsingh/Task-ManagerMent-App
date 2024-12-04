import React, { useState } from 'react'
import Robot from './Robot'
import "./MainPage.css"
import LoginPage from './LoginPage'
import RigisterPage from './RigisterPage'

const MainPage = () => {
  const [login, setLogin] = useState(true); //Register or Login Page


  const [showConformPassword, setShowConformPassword] = useState(true); //Initial eye opened and and conform passoword not visible
  const [showPassword , setShowPassword] = useState(true); //Initial eye opened  and passoword not visible
  
  const Login = () => {
    setLogin(!login); //Toggle the Login And Register page
  };


    //opened Eye password not visible when eye closed conformpassowod will visible 
  const visibleConformPasswprd = ()=>{
    setShowConformPassword(!showConformPassword)
  }

  //opened Eye password not visible when eye closed passowod will visible 
  const visiblePassword = ()=>{
    setShowPassword(!showPassword)
  }

  
 


  return (
    <div className='mainPage'>
      <Robot/>
      {login ? 
      <LoginPage Login={Login}

      visiblePassword={visiblePassword}
      showPassword={showPassword}
 
      /> 
      :
      <RigisterPage
      Login={ Login}
      visiblePassword={visiblePassword}
      visibleConformPasswprd={visibleConformPasswprd}
      showPassword={showPassword}
      showConformPassword={showConformPassword}

      />}
    </div>
  )
}

export default MainPage

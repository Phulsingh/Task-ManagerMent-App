import React from 'react'
import MainPage from './Components/StartProject/MainPage'
import "./App.css"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from './Components/StartProject/LoginPage';
import RegisterPage from "./Components/StartProject/RigisterPage"
import Dashoboard from './Components/DashBoard/Dashoboard';
import Analitics from './Components/DashBoard/Analitics';
import Setting from './Components/DashBoard/Setting';


const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/'  element={ <MainPage/>} />
        <Route path="/login" element={ <LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='dashboard' element={<Dashoboard/>}/>
        <Route path='analitics' element={<Analitics/>}/>
        <Route path='setting' element={<Setting/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

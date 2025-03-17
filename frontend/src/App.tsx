import { Routes, Route } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import Settings from "./Pages/Settings/Settings"
import Profile from "./Pages/Profile/Profile"


function App() {


  return (
    <div>
      
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    
    </div>
  )
}

export default App

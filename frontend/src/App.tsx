import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./Components/Navbar/Navbar"
import Home from "./Pages/Home/Home"
import Register from "./Pages/Register/Register"
import Login from "./Pages/Login/Login"
import Settings from "./Pages/Settings/Settings"
import Profile from "./Pages/Profile/Profile"
import { useAuthenticationStore } from "./Store/AuthenticationStore"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { Toaster } from "react-hot-toast"
import { ThemeStore } from "./Store/ThemeStore"

function App() {
  const authUser = useAuthenticationStore(state => state.authUser);
  const checkAuth = useAuthenticationStore(state => state.checkAuth);
  const isCheckingAuth = useAuthenticationStore(state => state.isCheckingAuth);
  const onlineUsers = useAuthenticationStore(state => state.onlineUsers);
  
  // Fix the theme access
  const theme = ThemeStore(state => state.theme);

  useEffect(() => {
    checkAuth();
    
    const timer = setTimeout(() => {
      if (useAuthenticationStore.getState().isCheckingAuth) {
        useAuthenticationStore.setState({ isCheckingAuth: false });
      }
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    console.log("Online Users:", onlineUsers);
  }, [onlineUsers]);

  if(isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={!authUser ? <Register/> : <Navigate to="/"/>}/>
        <Route path="/login" element={!authUser ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/profile" element={authUser ? <Profile/> : <Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App

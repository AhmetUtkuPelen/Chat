import ChatComponent from "../../Components/ChatComponent/ChatComponent"
import ChatNotSelected from "../../Components/ChatNotSelected/ChatNotSelected"
import SideBar from "../../Components/SideBar/SideBar"
import { ChatStore } from "../../Store/ChatStore"
import { useAuthenticationStore } from "../../Store/AuthenticationStore"
import { Link } from "react-router-dom"
import { MessageCircle } from "lucide-react"

const Home = () => {
  // Get authentication state
  const { authUser } = useAuthenticationStore()
  
  // Get selected user (only needed when authenticated)
  const { selectedUser } = ChatStore()

  // If user is not logged in, show welcome screen
  if (!authUser) {
    return (
      <div className="h-screen bg-base-200">
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="bg-base-100 rounded-lg shadow-lg max-w-md p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageCircle className="w-8 h-8 text-primary"/>
            </div>
            <h1 className="text-2xl font-bold mb-4">Welcome to Chat App</h1>
            <p className="text-base-content/70 mb-6">
              Connect with friends and start chatting in real-time.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/login" className="btn btn-primary rounded-lg">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary rounded-lg">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // If user is logged in, show the chat interface
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-lg w-full max-w-6xl h-[calc(100vh-100px)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SideBar/>
            {!selectedUser ? <ChatNotSelected/> : <ChatComponent/>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
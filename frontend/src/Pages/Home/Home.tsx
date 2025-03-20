import ChatComponent from "../../Components/ChatComponent/ChatComponent"
import ChatNotSelected from "../../Components/ChatNotSelected/ChatNotSelected"
import SideBar from "../../Components/SideBar/SideBar"
import { ChatStore } from "../../Store/ChatStore"


const Home = () => {

  const {selectedUser} = ChatStore()

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

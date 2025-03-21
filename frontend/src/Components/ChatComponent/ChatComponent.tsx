import { useEffect } from "react"
import { ChatStore } from "../../Store/ChatStore"
import ChatHeader from "../ChatHeader/ChatHeader"
import MessageInput from "../MessageInput/MessageInput"
import SkeletonMessage from "../SkeletonMessage/SkeletonMessage"


const ChatComponent = () => {

  const {selectedUser, messages, getMessages, isMessagesLoading} = ChatStore() as {
    selectedUser: { _id: string } | null,
    messages: any[],
    getMessages: (id: string) => void,
    isMessagesLoading: boolean
  }

  useEffect(() => {
  getMessages(selectedUser?._id || "")    
  }, [selectedUser?._id])

  if(isMessagesLoading) { 
    return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader/>
      <SkeletonMessage/>
      <MessageInput/>
    </div>
  )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      
      <ChatHeader/>
      <p>Messages...</p>
    
    <MessageInput/>
    
    </div>
  )
}

export default ChatComponent
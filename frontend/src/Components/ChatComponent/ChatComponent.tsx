import { useEffect, useRef } from "react"
import { ChatStore } from "../../Store/ChatStore"
import ChatHeader from "../ChatHeader/ChatHeader"
import MessageInput from "../MessageInput/MessageInput"
import SkeletonMessage from "../SkeletonMessage/SkeletonMessage"
import { useAuthenticationStore } from "../../Store/AuthenticationStore"
import { MessageTimeFormatter } from "../../Utility/Utility"
import UserPng from "../../assets/user.png"

const ChatComponent = () => {

  // ? Chat Store ? \\
  const {selectedUser, messages, getMessages, isMessagesLoading,receiveMessages,unReceiveMessages} = ChatStore() as {
    selectedUser: { _id: string, profilePicture?: string, fullName?: string } | null,
    messages: any[],
    getMessages: (id: string) => void,
    isMessagesLoading: boolean
    receiveMessages: () => void
    unReceiveMessages: () => void
  }
  // ? Chat Store ? \\


  // ? Authentication Store ? \\
  const {authUser} = useAuthenticationStore();
  // ? Authentication Store ? \\


  const EndMessage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(selectedUser) getMessages(selectedUser._id);
  }, [selectedUser, getMessages])

  

  useEffect(() => {

      receiveMessages();

      return () => {
        unReceiveMessages();
      }

  }, [selectedUser?._id,receiveMessages,unReceiveMessages])


  useEffect(() => {
    if(EndMessage.current && messages){
      EndMessage.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  
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
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message:any,index:number) => (
          <div className={`chat ${message.senderId === authUser?._id ? "chat-end" : "chat-start"}`} key={index} ref={EndMessage}>
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
              <img src={message.senderId === authUser?._id ? authUser.profilePicture || UserPng : selectedUser?.profilePicture || UserPng} alt="User Avatar" />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {MessageTimeFormatter(message.createdAt)}
              </time>
            </div>

            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img src={message.image} alt="Message Image" className="rounded-lg mb-2 sm:max-w-[200px]" />
              )}
              {message.text && <p>{message.text}</p>}
            </div>

          </div>
        ))}
      </div>
    
    <MessageInput/>
    
    </div>
  )
}

export default ChatComponent

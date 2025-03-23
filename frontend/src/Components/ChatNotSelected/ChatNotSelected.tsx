import { MessageSquare } from "lucide-react"


const ChatNotSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* ICON */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center"
            >
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>
        {/* ICON */}

        {/* WELCOME */}
        <h2 className="text-2xl font-bold">Welcome to Chat App!</h2>
        <p className="text-base-content/60">
          Select a Friend From Sidebar To Start Chatting
        </p>
        {/* WELCOME */}

      </div>
    </div>
  )
}

export default ChatNotSelected

import { Send } from "lucide-react";
import { ThemeStore } from "../../Store/ThemeStore"
import { MyThemes } from "../../Themes/Themes"

const Settings = () => {

  // ? themes ? \\
  const theme = ThemeStore(state => state.theme);
  const setTheme = ThemeStore(state => state.setTheme);
  // ? themes ? \\


  // ? Display Dummy Chat Messages ? \\
  const Display_Chat_Messages = [
    { id: 1, content: "Hello There ! How are you ?", isSent: false },
    { id: 2, content: "Wazzup ? I'm Good !", isSent: true },
  ];
  // ? Display Dummy Chat Messages ? \\



  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl text-center">
      <div className="space-y-6">
        
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold text-blue-600">THEMES</h2>
          <p className="text-sm text-base-content/70">Choose Theme For Your Chat App</p>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {MyThemes.map((myTheme, index) => (
            <button
              key={index}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === myTheme ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(myTheme)}
            >
              <div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={myTheme}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {myTheme.charAt(0).toUpperCase() + myTheme.slice(1)}
              </span>
            </button>
          ))}
        </div>


          {/* ? CHAT PREVIEW ? */}
        <h3 className="text-lg font-semibold mb-3">Preview</h3>
        <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
          <div className="p-4 bg-base-200">
            <div className="max-w-lg mx-auto">
              <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                {/* Chat Header Thing */}
                <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
                      J
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Random Guy</h3>
                      <p className="text-xs text-base-content/70">Online</p>
                    </div>
                  </div>
                </div>
                {/* Chat Header Thing */}

                {/* Chat Messages Thing */}
                <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                  {Display_Chat_Messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isSent ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent ? "bg-primary text-primary-content" : "bg-base-200"}
                        `}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`
                            text-[10px] mt-1.5
                            ${message.isSent ? "text-primary-content/70" : "text-base-content/70"}
                          `}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Chat Messages Thing */}


                {/* Chat Input Thing */}
                <div className="p-4 border-t border-base-300 bg-base-100">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className="input input-bordered flex-1 text-sm h-10"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="btn btn-primary h-10 min-h-0">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
                {/* Chat Input Thing */}

              </div>
            </div>
          </div>
        </div>
          {/* ? CHAT PREVIEW ? */}


      </div>
    </div>
  )
}

export default Settings

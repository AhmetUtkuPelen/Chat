import { Link } from "react-router-dom"
import { useAuthenticationStore } from "../../Store/AuthenticationStore"
import { LogOut, MessageCircle, Settings, User } from "lucide-react"


const Navbar = () => {

  const {authUser} = useAuthenticationStore()
  const logout = useAuthenticationStore((state: any) => state.logout)

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to={"/"} className="flex items-center gap-3 hover:opacity-80 transition-all">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-primary"/>
              </div>
              <h1 className="text-lg font-bold text-blue-700">Chat App</h1>
            </Link>
          </div>

        <div className="flex items-center gap-2">
          <Link to={"/settings"} className="btn btn-sm gap-2 transition-colors bg-white">
            <Settings className="h-4 w-4 text-blue-500"/>
            <span className="hidden sm:inline text-blue-500">Settings</span>
          </Link>


          {authUser && (
            <>
              <Link to={"/profile"} className="btn btn-sm gap-2 transition-colors bg-white">
                <User className="size-5 text-blue-500"/>
                <span className="hidden sm:inline text-blue-500">Profile</span>
              </Link>
            
              <button className="flex gap-2 items-center" onClick={logout}>
                <LogOut className="size-5 text-red-500"/>
              </button>
            </>
          )}


        </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar

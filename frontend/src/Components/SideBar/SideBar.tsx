import { useEffect, useState } from "react";
import { ChatStore } from "../../Store/ChatStore"
import SkeletonSideBar from "../SkeletonSideBar/SkeletonSideBar";
import { Users } from "lucide-react";
import UserPng from "../../assets/user.png"
import {User} from "../../Store/ChatStore"


export const SideBar = () => {

    const users: User[] = ChatStore().users;


    const {getUsers, selectedUser, selectUser, isUsersLoading, OnlineUsers} = ChatStore()
    const [showOnlineOnly, setShowOnlineOnly] = useState<boolean>(false);


    const filteredUsers = showOnlineOnly
    ? users.filter((user) => OnlineUsers.includes(user?._id))
    : users;


    useEffect(()=> {
        getUsers()
    },[getUsers])


    if(isUsersLoading) return <SkeletonSideBar/>

    
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        {/*  ? Online filter toggle ? */}
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({OnlineUsers.length} online)</span>
        </div>
      </div>
        {/*  ? Online filter toggle ? */}


      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => selectUser(user)}
            className={`
              w-full p-3 flex items-center gap-3
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user?.profilePicture || UserPng}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {OnlineUsers.includes(user?._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {OnlineUsers.includes(user?._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>

    </aside>
  )
}

export default SideBar

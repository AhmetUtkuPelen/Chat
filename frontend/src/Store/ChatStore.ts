import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosSetup } from "../Axios/Axios";


// ? User Interface ? \\
export interface User {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string;
  }
// ? User Interface ? \\



export const ChatStore = create((set: any) => ({

    messages : [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,
    OnlineUsers : [],

    getUsers : async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosSetup.get(`/messages/users`);
            set({ users: response.data });
        } catch (error) {
            toast.error("Something Went Wrong !");
            console.error("Users fetch error:", error);
        }finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages : async (id:string) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axiosSetup.get(`/messages/${id}`);
            set({ messages: response.data });
        } catch (error) {
            toast.error("Something Went Wrong !");
            console.error("Messages fetch error:", error);
        }finally {
            set({ isMessagesLoading: false });
        }
    },

    selectUser : (user:User) => {
        set({ selectedUser: user });
    },

}))
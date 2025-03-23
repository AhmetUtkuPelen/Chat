import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosSetup } from "../Axios/Axios";
import { useAuthenticationStore } from "./AuthenticationStore";


// ? User Interface ? \\
export interface User {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string;
    createdAt: string;
    updatedAt: string;
  }
// ? User Interface ? \\




// ? Message Interface ? \\
export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    text?: string;
    image?: string;
    createdAt: string;
    updatedAt: string;
}
// ? Message Interface ? \\

interface ChatState {
    messages: Message[];
    users: User[];
    selectedUser: User | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
    OnlineUsers: string[];
    getUsers: () => Promise<void>;
    getMessages: (id: string) => Promise<void>;
    selectUser: (user: User) => void;
    sendMessages: (messageData: {text: string, image: string}) => Promise<void>;
    receiveMessages: () => void;
    unReceiveMessages: () => void;
}

export const ChatStore = create<ChatState>()((set, get) => ({

    messages : [],
    users : [],
    selectedUser : null,
    isUsersLoading : false,
    isMessagesLoading : false,
    OnlineUsers : [] as string[],

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

    sendMessages : async (messageData: {text:string,image:string}) => {
        const {selectedUser,messages} = get();
        if (!selectedUser) return;
        try {
            const response = await axiosSetup.post(`/messages/${selectedUser._id}`, messageData);
            set({ messages: [...messages, response.data] });
        } catch (error) {
            toast.error("Something Went Wrong !");
            console.error("Messages send error:", error);
        }
    },

    receiveMessages : () => {
        
        const {selectedUser} = get();

        if(!selectedUser) return;

        const socket = useAuthenticationStore.getState().socket;

        if (socket) {
            socket.on("getMessage", (message:Message) => {
                if(message.senderId !== selectedUser._id) return;
                set({
                    messages : [...get().messages,message]   
                })
            })
        }

    },

    unReceiveMessages : () => {

        const socket = useAuthenticationStore.getState().socket;

        if (socket) {
            socket.off("getMessage");
        }

    },

}))

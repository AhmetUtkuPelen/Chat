import {create} from "zustand";
import { axiosSetup } from "../Axios/Axios";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";
import { User } from "./ChatStore";



const Back_End_URL = import.meta.env.MODE === "development" ? import.meta.env.VITE_SOCKET_URL : "/api";


interface AuthState {
    authUser: User | null;
    isRegistering: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
    updateProfile: (data: {fullName: string, email: string, profilePicture: string}) => Promise<void>;
    checkAuth: () => Promise<void>;
    register: (data: {fullName: string, email: string, password: string}) => Promise<void>;
    login: (data: {email: string, password: string}) => Promise<void>;
    logout: () => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
    socket: Socket | null;
}

export const useAuthenticationStore = create<AuthState>((set,get) => ({

    authUser:null,

    isRegistering:false,

    isLoggingIn:false,

    isUpdatingProfile:false,

    isCheckingAuth:true,
    
    onlineUsers: [],

    socket : null,

    
    checkAuth: async () => {
        try {
            const response = await axiosSetup.get(`/auth/check-authentication`);
            set({ authUser: response.data });

            get().connectSocket();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status !== 401) {
                console.error("Authentication check error:", error);
            }
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (data: {fullName: string, email: string, password: string}) => {
        set({ isRegistering: true });
        try {
            const response = await axiosSetup.post(`/auth/register`, data);
            set({ authUser: response.data });
            toast.success("User Registered Successfully !");

            get().connectSocket();
        } catch (error) {
            toast.error("Something Went Wrong !");
            console.error("Registration error:", error);
        }finally {
            set({ isRegistering: false });
        }
    },

    logout: async () => {
        try {
            await axiosSetup.post(`/auth/logout`);
            set({ authUser: null });
            toast.success("Logged Out Successfully!");

            get().disconnectSocket();
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed!");
        }
    },

    login: async (data: {email: string, password: string}) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosSetup.post(`/auth/login`, data);
            set({ authUser: response.data });
            toast.success("User Logged In Successfully !");

            get().connectSocket();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Login error details:", error.response?.data);
                toast.error(error.response?.data?.message || "Login failed!");
            } else {
                toast.error("Something Went Wrong!");
                console.error("Login error:", error);
            }
        } finally {
            set({ isLoggingIn: false });
        }
    },

    updateProfile: async (data: {fullName: string, email: string, profilePicture: string}) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosSetup.put(`/auth/updateProfile`, data);
            set({ authUser: response.data });
            toast.success("Profile Updated Successfully !");
        } catch (error) {
            toast.error("Something Went Wrong !");
            console.error("Profile update error:", error);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: async () => {
        const {authUser} = get();

        if(!authUser) {
            return;
        }
        
        // Disconnect existing socket if any
        if(get().socket?.connected) {
            get().socket?.disconnect();
        }

        const socket = io(Back_End_URL, {
            auth: { userId: authUser?._id },
            transports: ['websocket'],
            autoConnect: false,
            reconnection: true,
            reconnectionAttempts: 5
        });
        
        // Set up event handlers before connecting
        socket.on("connect", () => {
            socket.emit("getOnlineUsers");
        });
        
        socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error.message);
        });

        socket.on("disconnect", (reason) => {
            console.log("Socket disconnected:", reason);
        });

        socket.on("getOnlineUsers", (users: string[]) => {
            set({onlineUsers: users});
        });

        socket.on("userConnected", (userId: string) => {
            set(state => {
                const newOnlineUsers = [...new Set([...state.onlineUsers, userId])];
                return {onlineUsers: newOnlineUsers};
            });
        });

        socket.on("userDisconnected", (userId: string) => {

            set(state => {
                const newOnlineUsers = state.onlineUsers.filter(id => id !== userId);
                return {onlineUsers: newOnlineUsers};
            });
        });
        
        // Set socket first, then connect
        set({socket: socket});

        socket.connect();

        // Request online users list after a short delay to ensure connection is established
        setTimeout(() => {
            if (socket.connected) {
                socket.emit("getOnlineUsers");
            }
        }, 1000);
    },

    disconnectSocket : async () => {

        if(get().socket?.connected) get().socket?.disconnect();

        set({socket:null})

    },

}))

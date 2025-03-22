import {create} from "zustand";
import { axiosSetup } from "../Axios/Axios";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { Socket } from "socket.io-client";


interface AuthState {
    authUser: any;
    isRegistering: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    onlineUsers: string[];
    updateProfile: (data: {fullName: string, email: string, profilePicture: string}) => Promise<void>;
    checkAuth: () => Promise<void>;
    register: (data: {fullName: string, email: string, password: string}) => Promise<void>;
    login: (data: {fullName: string, email: string, password: string}) => Promise<void>;
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

    login: async (data: {fullName: string, email: string, password: string}) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosSetup.post(`/auth/login`, data);
            set({ authUser: response.data });
            toast.success("User Logged In Successfully !");

            get().connectSocket();
        } catch (error) {
            toast.error("Something Went Wrong !");
            console.error("Login error:", error);
        }finally {
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

    connectSocket : async () => {

        const {authUser} = get();

        if(!authUser || get().socket?.connected) return;

        const socket = io(import.meta.env.VITE_SOCKET_URL,{
            withCredentials:true
        })
        
        socket.connect();

    },

    disconnectSocket : async () => {

    },

}))

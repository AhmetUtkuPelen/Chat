import {create} from "zustand";
import { axiosSetup } from "../Axios/Axios";
import axios from "axios";
import toast from "react-hot-toast";


interface AuthState {
    authUser: any;
    isRegistering: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
    register: (data: {fullName: string, email: string, password: string}) => Promise<void>;
    login: (data: {fullName: string, email: string, password: string}) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthenticationStore = create<AuthState>((set) => ({

    authUser:null,

    isRegistering:false,

    isLoggingIn:false,

    isUpdatingProfile:false,

    isCheckingAuth:true,

    
    checkAuth: async () => {
        try {
            const response = await axiosSetup.get(`/auth/check-authentication`);
            set({ authUser: response.data });
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
        } catch (error) {
            console.error("Logout error:", error);
        }
    },

    login: async (data: {fullName: string, email: string, password: string}) => {
        set({ isLoggingIn: true });
        try {
            const response = await axiosSetup.post(`/auth/login`, data);
            set({ authUser: response.data });
            toast.success("User Logged In Successfully !");
        } catch (error) {
            toast.error("Something Went Wrong !");
            console.error("Login error:", error);
        }finally {
            set({ isLoggingIn: false });
        }
    },

}))

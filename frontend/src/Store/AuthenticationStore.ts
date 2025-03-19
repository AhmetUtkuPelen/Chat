import {create} from "zustand";
import { axiosSetup } from "../Axios/Axios";
import axios from "axios";


interface AuthState {
    authUser: any; // Replace with proper user type
    isRegistering: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
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
            // Don't log 401 errors as they're expected for unauthenticated users
            if (axios.isAxiosError(error) && error.response?.status !== 401) {
                console.error("Authentication check error:", error);
            }
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    register: async (data) => {

    }

}))
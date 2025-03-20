import { create } from "zustand";

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeStore = create<ThemeState>((set) => ({
  theme: localStorage.getItem("chat-app-theme") || "light",
  
  setTheme: (theme: string) => {
    localStorage.setItem("chat-app-theme", theme);
    set({ theme });
  }
})

);
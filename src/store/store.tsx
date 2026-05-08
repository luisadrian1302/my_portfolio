import { create } from 'zustand';

export type ThemeMode = 'light' | undefined;
import { persist } from "zustand/middleware";


export interface portfolioStore {
  theme?: ThemeMode;           // undefined = dark
  setTheme: (theme?: ThemeMode) => void;
  setLightMode: () => void;
  setDarkMode: () => void;     // realmente solo limpia
  toggleTheme: () => void;
}

export const usePortfolioStore = create<portfolioStore>()(
  persist(
    (set, get) => ({
      theme: undefined,
      setTheme: (theme) => {
        set({ theme });
      },

      setLightMode: () => {
        set({ theme: 'light' });
      },

      setDarkMode: () => {
        set({ theme: undefined }); // dark implícito
      },

      toggleTheme: () => {
        const current = get().theme;
        set({ theme: current === 'light' ? undefined : 'light' });
      },
    }),
    {
      name: "theme-storage", // clave en localStorage
      getStorage: () => localStorage, // opcional, default localStorage
    }

  )

 
);

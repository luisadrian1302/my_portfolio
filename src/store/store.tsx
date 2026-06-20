import { create } from 'zustand';

export type ThemeMode = 'light' | undefined;
import { createJSONStorage, persist } from "zustand/middleware";


export interface portfolioStore {
  theme?: ThemeMode;           // undefined = dark
  toggleHeader?: boolean;           // undefined = dark
  setTheme: (theme?: ThemeMode) => void;
  setLightMode: () => void;
  setDarkMode: () => void;     // realmente solo limpia
  toggleTheme: () => void;
  toggleHeaderFunc: () => void;
  toggleHeaderFalse: () => void;
  toggleHeaderTrue: () => void;
}

export const usePortfolioStore = create<portfolioStore>()(
  persist(
    (set, get) => ({
      theme: undefined,
      toggleHeader: true,
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
      toggleHeaderFunc: () => {
        const current = get().toggleHeader;
        console.log(current);
        
        set({ toggleHeader:  !current  });
      },
      toggleHeaderFalse: () => {
        
        set({ toggleHeader:  false  });
      },
      toggleHeaderTrue: () => {
        
        set({ toggleHeader:  true  });
      },
    }),
    {
      name: "theme-storage", // clave en localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ theme: state.theme }),
    }

  )

 
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
export type Language = "en" | "es";

interface LanguageStore {
  lang: Language;
  setLang: (lang: Language) => void;
}

// export const useLanguageStore = create<LanguageStore>((set) => ({
//   lang: "es", // por defecto español
//   setLang: (lang) => set({ lang }),
// }));
export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      lang: "es", // default
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "language-storage", // clave en localStorage
      getStorage: () => localStorage, // opcional, default localStorage
    }
  )
);
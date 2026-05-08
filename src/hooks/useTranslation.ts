import { useEffect, useState } from "react";
import { useLanguageStore } from "../store/languageStore";

export const useTranslation = () => {
  const { lang } = useLanguageStore();

  const [t, setT] = useState({});
  const [loadingTranslation, setLoadingTranslation] = useState(false);

  const loadTranslations = async () => {
      try {
        setLoadingTranslation(true);
        const translations = await import(`../i18n/${lang}.json`);
        console.log(lang);
        
        setT(translations.default);
      } catch (err) {
        console.error("Error loading translations", err);
      }finally {
        setLoadingTranslation(false);
      }
    };

  return  { t, loadTranslations, loadingTranslation };
};

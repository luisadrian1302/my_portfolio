import React, { useEffect, useRef, useState } from "react";
import "../styles/header.scss";
import { FiMoon, FiSettings, FiSun } from "react-icons/fi";
import { usePortfolioStore } from "../store/store";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguageStore, type Language } from "../store/languageStore";

export const Header = ({ t }: any) => {
    const { theme, setTheme } = usePortfolioStore();
    const { lang, setLang } = useLanguageStore();
    const [activeSection, setActiveSection] = useState("home");
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const languageMenuRef = useRef(null);
    const sectionRefs = useRef({});

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
                setIsLanguageMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const sections = ["home", "about", "projects", "contact"];

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                sectionRefs.current[section] = element;
            }
        });

        // Detectar si es móvil (opcional)
        const isMobile = window.innerWidth <= 768;

        // Configurar threshold diferente para móvil y desktop
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // En móvil, usar 0.3 (30%) o incluso menos
                    // En desktop, mantener 0.7 (70%)
                    const threshold = 0.5;

                    if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                threshold: .5, // Múltiples thresholds en móvil
                rootMargin: "0px",
            }
        );

        Object.values(sectionRefs.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => {
            Object.values(sectionRefs.current).forEach((section) => {
                if (section) observer.unobserve(section);
            });
        };
    }, []);
    const toggleTheme = () => {
        if (theme === "light") {
            setTheme(undefined);
        } else {
            setTheme("light");
        }
    };

    const handleChangeLanguage = (newLang: Language) => {
        setLang(newLang);
        setIsLanguageMenuOpen(false);
    };

    const handleClick = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setActiveSection(sectionId);
        }
    };

    return (
        <header className="header">
            <nav className="nav-links">
                <a
                    href="#home"
                    className={activeSection === "home" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("home");
                    }}
                >
                    {t.home}
                </a>
                <a
                    href="#about"
                    className={activeSection === "about" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("about");
                    }}
                >
                    {t.about}
                </a>
                <a
                    href="#projects"
                    className={activeSection === "projects" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("projects");
                    }}
                >
                    {t.Projects}
                </a>
                <a
                    href="#contact"
                    className={activeSection === "contact" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("contact");
                    }}
                >
                    {t.contact}
                </a>

                <div className="language-menu-container" ref={languageMenuRef}>
                    <FiSettings 
                        className="settings-icon" 
                        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    />
                    {isLanguageMenuOpen && (
                        <div className="language-dropdown">
                            <button
                                className={`language-option ${lang === 'es' ? 'active' : ''}`}
                                onClick={() => handleChangeLanguage('es')}
                            >
                                Español
                            </button>
                            <button
                                className={`language-option ${lang === 'en' ? 'active' : ''}`}
                                onClick={() => handleChangeLanguage('en')}
                            >
                                English
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    );
};
import React, { useEffect, useRef, useState } from "react";
import "../styles/header.scss";
import { FiMoon, FiSettings, FiSun } from "react-icons/fi";
import { usePortfolioStore } from "../store/store";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguageStore, type Language } from "../store/languageStore";
import { HiHome, HiUser } from "react-icons/hi";
import { FcAbout } from "react-icons/fc";
import { LuFolderGit2, LuMail, LuUser } from "react-icons/lu";
import { FaFolder, FaUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";

export const Header = ({ t }: any) => {
    const { theme, setTheme, toggleHeader , toggleHeaderTrue, toggleHeaderFalse} = usePortfolioStore();
    const { lang, setLang, } = useLanguageStore();
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
        
        const sectionIds = ["home", "about", "trajectory", "projects", "contact"];
        const sectionElements = sectionIds
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null);

        if (sectionElements.length === 0) return;

        const getBestSectionId = () => {
            const scores = sectionElements.map((section) => {
                const rect = section.getBoundingClientRect();
                const visibleTop = Math.max(rect.top, 0);
                const visibleBottom = Math.min(rect.bottom, window.innerHeight);
                const visibleHeight = Math.max(0, visibleBottom - visibleTop);
                const sectionCenter = rect.top + rect.height / 2;
                const distanceFromCenter = Math.abs(sectionCenter - window.innerHeight / 2);
                return {
                    id: section.id,
                    visibleHeight,
                    distanceFromCenter,
                };
            });

            return scores.reduce((best, current) => {
                if (current.visibleHeight > best.visibleHeight) return current;
                if (
                    current.visibleHeight === best.visibleHeight &&
                    current.distanceFromCenter < best.distanceFromCenter
                ) {
                    return current;
                }
                return best;
            }, scores[0]).id;
        };

        const updateActiveSection = () => {
            const bestId = getBestSectionId();
            console.log(bestId);
            
            if (bestId == "contact" || bestId == "home") {
                toggleHeaderTrue()
            }else{
                let verificarModalAbierto = document.querySelector(".openModalShow")
                if(!verificarModalAbierto){
                    
                    toggleHeaderFalse()
                }else{
                    
                toggleHeaderTrue()

                }
                

            }
            
            setActiveSection((current) => (current === bestId ? current : bestId));
        };

        updateActiveSection();
        window.addEventListener("scroll", updateActiveSection, { passive: true });
        window.addEventListener("resize", updateActiveSection, { passive: true });

        return () => {
            window.removeEventListener("scroll", updateActiveSection);
            window.removeEventListener("resize", updateActiveSection);
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
        <header className={toggleHeader ? " header hideHeader" : "header"}>
            <nav className="nav-links">
                <a
                    href="#home"
                    className={activeSection === "home" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("home");
                    }}
                >
                    <HiHome />
                    {/* <span className="text-nav">

                        {t.home}
                    </span> */}
                </a>
                <a
                    href="#about"
                    className={activeSection === "about" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("about");
                    }}
                >
                    <FaUser />
                    {/* <span className="text-nav">
                        {t.about}

                    </span> */}

                </a>
                  <a
                    href="#trajectory"
                    className={activeSection === "trajectory" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("trajectory");
                    }}
                >
                    <RiTimeLine />
                    {/* <span className="text-nav">
                        {t.contact}

                    </span> */}

                </a>
                <a
                    href="#projects"
                    className={activeSection === "projects" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("projects");
                    }}
                >
                    <FaFolder />
                    {/* <span className="text-nav">
                        {t.Projects}

                    </span> */}

                </a>
                <a
                    href="#contact"
                    className={activeSection === "contact" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        handleClick("contact");
                    }}
                >
                    <FaTelegramPlane />
                    {/* <span className="text-nav">
                        {t.contact}

                    </span> */}

                </a>
              
                <a

                >
                    {/* <LuMail /> */}
                    <IoSettings
                        className="settings-icon"
                        onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                    />
                    {/* <span className="text-nav">
                        {t.config}

                    </span> */}

                </a>
                <div className="language-menu-container" ref={languageMenuRef}>
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
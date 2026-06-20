import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import "../styles/header.scss";
import { usePortfolioStore } from "../store/store";
import { useLanguageStore, type Language } from "../store/languageStore";
import { HiHome } from "react-icons/hi";
import { FaFolder, FaUser } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { FaTelegramPlane } from "react-icons/fa";
import { RiTimeLine } from "react-icons/ri";

export const Header = () => {
    const toggleHeader = usePortfolioStore((state) => state.toggleHeader);
    const lang = useLanguageStore((state) => state.lang);
    const setLang = useLanguageStore((state) => state.setLang);
    const [activeSection, setActiveSection] = useState("home");
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const languageMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (languageMenuRef.current && !languageMenuRef.current.contains(event.target as Node)) {
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
            const modalIsOpen = Boolean(document.querySelector(".openModalShow"));
            const shouldHideHeader = bestId === "contact" || bestId === "home" || modalIsOpen;
            const store = usePortfolioStore.getState();

            if (store.toggleHeader !== shouldHideHeader) {
                if (shouldHideHeader) store.toggleHeaderTrue();
                else store.toggleHeaderFalse();
            }
            
            setActiveSection((current) => (current === bestId ? current : bestId));
        };

        let animationFrameId: number | null = null;

        const scheduleUpdate = () => {
            if (animationFrameId !== null) return;

            animationFrameId = window.requestAnimationFrame(() => {
                animationFrameId = null;
                updateActiveSection();
            });
        };

        updateActiveSection();
        window.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate, { passive: true });

        return () => {
            window.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            if (animationFrameId !== null) window.cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleChangeLanguage = (newLang: Language) => {
        setLang(newLang);
        setIsLanguageMenuOpen(false);
    };

    const handleClick = (sectionId: string) => {
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
                    onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
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
                    onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
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
                    onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
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
                    onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
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
                    onClick={(e: ReactMouseEvent<HTMLAnchorElement>) => {
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

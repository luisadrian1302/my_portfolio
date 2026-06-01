// ─── ProjectModal ──────────────────────────────────────────────────────────────

import { FiGlobe } from "react-icons/fi";
import { iconMap, MonitorIcon, PhoneIcon, SliderPlaceholder, type Project, type ViewMode } from "./ProjectCard";
import { type Slide } from "./ProjectCard";
import { useState, useEffect, type JSX } from "react";
import type { ModalSection } from "../interfaces/proyects";
import { BiCheckCircle } from "react-icons/bi";
import { CgCheck } from "react-icons/cg";
import { usePortfolioStore } from "../store/store";

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
    initialView: ViewMode;
    initialImageIndex: number;
}

export const ProjectModal = ({ isOpen, onClose, project, initialView, initialImageIndex }: ProjectModalProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>(initialView);
    const [selectedIndex, setSelectedIndex] = useState(initialImageIndex);
    const [isMobile, setIsMobile] = useState(false);
    const [currentSlides, setcurrentSlides] = useState<Slide[]>([]);
    const {  toggleHeaderFunc, toggleHeaderFalse, toggleHeaderTrue } = usePortfolioStore();


    useEffect(() => {
        console.log(isOpen);
        if (isOpen) {
            setViewMode(initialView)
            setSelectedIndex(initialImageIndex)
            toggleHeaderTrue()
        }else{
            toggleHeaderFalse()

        }
    }, [isOpen])



    useEffect(() => {

        setcurrentSlides(viewMode === "mobile"
            ? project.slides.mobile ?? []
            : project.slides.desktop ?? []);

    }, [viewMode])



    // Detectar tamaño de pantalla
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);



    const selectedImage = currentSlides[selectedIndex];

    // if (!isOpen) return null;

    // En móvil, las miniaturas se muestran horizontales debajo de la imagen
    const renderGallery = () => {
        if (isMobile) {
            return (
                <div style={galleryMobileStyle}>
                    {/* Miniaturas horizontales */}
                    <div style={thumbnailsHorizontalStyle}>
                        {currentSlides.map((slide, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedIndex(idx)}
                                style={thumbnailHorizontalStyle(selectedIndex === idx)}
                            >
                                {slide.src ? (
                                    <img src={slide.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                    <div style={thumbnailPlaceholderStyle}>📷</div>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* Imagen grande */}
                    <div style={mainImageMobileStyle}>
                        {selectedImage?.src ? (
                            <img src={selectedImage.src} alt={selectedImage.alt ?? ""} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        ) : (
                            <div style={imagePlaceholderStyle}>
                                <div style={placeholderIconStyle}>📷</div>
                                <span style={placeholderLabelStyle}>{selectedImage?.label ?? "Vista previa"}</span>
                            </div>
                        )}
                    </div>


                </div>
            );
        }

        // Versión desktop (vertical)
        return (
            <div style={galleryRowStyle}>
                {/* Miniaturas verticales */}
                <div style={thumbnailsContainerStyle}>
                    {currentSlides.map((slide, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedIndex(idx)}
                            style={thumbnailWrapperStyle(selectedIndex === idx)}
                        >
                            <div style={thumbnailInnerStyle}>
                                {slide.src ? (
                                    <img src={slide.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                                ) : (
                                    <div style={thumbnailPlaceholderStyle}>📷</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Imagen grande */}
                <div style={mainImageStyle}>
                    {selectedImage?.src ? (
                        <div style={mainImageInnerStyle}>
                            <img src={selectedImage.src} alt={selectedImage.alt ?? ""} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                    ) : (
                        <div style={imagePlaceholderStyle}>
                            <div style={placeholderIconStyle}>📷</div>
                            <span style={placeholderLabelStyle}>{selectedImage?.label ?? "Vista previa"}</span>
                        </div>
                    )}
                </div>


            </div>
        );
    };

    return (
        <>
            <style>{responsiveStyles}</style>
            <div style={{...modalOverlayStyle, scale: isOpen ? 1: 0 }} onClick={onClose} >
                <div style={modalContainerStyle} onClick={(e) => e.stopPropagation()} className="principal">

                    {/* Columna izquierda - Galería */}
                    <div style={leftColumnStyle} className="left">
                        {/* Vista previa modo (Desktop/Móvil) */}
                        <div style={modeToggleStyle}>
                            {project.slides.desktop && (
                                <button
                                    onClick={() => setViewMode("desktop")}
                                    style={modeButtonStyle(viewMode === "desktop")}
                                >
                                    <MonitorIcon /> <span style={modeButtonTextStyle}>Desktop</span>
                                </button>
                            )}
                            {project.slides.mobile && (
                                <button
                                    onClick={() => setViewMode("mobile")}
                                    style={modeButtonStyle(viewMode === "mobile")}
                                >
                                    <PhoneIcon /> <span style={modeButtonTextStyle}>Móvil</span>
                                </button>
                            )}
                        </div>

                        {renderGallery()}
                    </div>


                    <div style={rightColumnStyle} className="modal-scroll right">
                        {/* Título y tags (siempre visibles) */}
                        <div>
                            <p style={projectTitleStyle}>{project.title}</p>
                            <div style={tagRowStyle}>
                                {project.tags.map(tag => (
                                    <span key={tag} style={tagStyle}>{tag}</span>
                                ))}
                            </div>
                        </div>
                        {
                            isOpen ? <>
                                {/* Contenido dinámico del modal */}
                                {project.modalContent?.map((section, idx) => renderSection(section, idx))}

                                {/* Links de acción (siempre al final) */}
                                <div style={linksRowStyle}>
                                    {project.url && (
                                        <a href={project.url} target="_blank" style={linkButtonStyle}>
                                            <FiGlobe size={14} /> Ver proyecto
                                        </a>
                                    )}
                                    {project.uris?.map((uri, idx) => {
                                        const Icon = iconMap[uri.icon || "link"];
                                        return (
                                            <a key={idx} href={uri.url} target="_blank" style={linkButtonStyle}>
                                                <Icon size={14} /> {uri.text}
                                            </a>
                                        );
                                    })}
                                    <button onClick={onClose} style={closeButtonStyle}>
                                        Cerrar
                                    </button>
                                </div>
                            </> : null
                        }

                    </div>
                </div>
            </div>
        </>
    );
};
// ─── Renderizador de secciones dinámicas ──────────────────────────────────────

const renderSection = (section: ModalSection, index: number) => {
    switch (section.type) {
        case "title":
            const TitleTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements;
            return (
                <TitleTag
                    key={section.id || index}
                    style={{
                        fontSize: section.level === 1 ? "24px" : section.level === 2 ? "18px" : "16px",
                        marginTop: index === 0 ? 0 : 16,
                    }}
                >
                    {section.content}
                </TitleTag>
            );

        case "paragraph":
            return (
                <p key={section.id || index} style={descriptionTextStyle}>
                    {section.content}
                </p>
            );

        case "list":
            return (
                <div key={section.id || index}>
                    {section.title && <p style={sectionTitleStyle}>{section.title}</p>}
                    <ul style={featuresListStyle}>
                        {section.items.map((item, idx) => (
                            <li key={idx} style={featureItemStyle}>
                                {section.variant === "checkmarks" && <span style={featureCheckStyle}><CgCheck color={"#29dd32"} /></span>}
                                {section.variant === "bullets" && <span style={featureDotStyle}></span>}
                                {section.variant === "numbers" && <span style={featureNumberStyle}>{idx + 1}.</span>}
                                {section.variant === "dots" && <span style={featureDotStyle}></span>}
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            );

        case "tech_stack":
            return (
                <div key={section.id || index}>
                    {section.title && <p style={sectionTitleStyle}>{section.title}</p>}
                    <div style={stackContainerStyle}>
                        {section.technologies.map((tech, idx) => (
                            <span key={idx} style={stackBadgeStyle}>
                                {tech.icon && <span style={{ marginRight: 4 }}>{tech.icon}</span>}
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            );

        case "divider":
            return <hr key={section.id || index} style={dividerStyle} />;

        case "custom":
            return <div key={section.id || index}>{section.component}</div>;

        default:
            return null;
    }
};
// ─── Estilos base ──────────────────────────────────────────────────────────────
// Agrega estos estilos a tus definiciones existentes

const featureCheckStyle: React.CSSProperties = {
    fontSize: "13px",
    flexShrink: 0,
};

const featureNumberStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--accent, #1A7CA7)",
    minWidth: "20px",
    flexShrink: 0,
};
// Overlay
const modalOverlayStyle: React.CSSProperties = {
    background: "rgba(0, 0, 0, 0.35)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    padding: "20px",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

};

// Contenedor del modal
const modalContainerStyle: React.CSSProperties = {
    display: "flex",
    width: "100%",
    maxWidth: "1200px",
    maxHeight: "90vh",
    background: "var(--surface, #131c26)",
    borderRadius: "20px",
    border: "1px solid var(--border, rgba(255,255,255,0.07))",
    overflow: "hidden",
};

// Columna izquierda
const leftColumnStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    flex: "1.3",
    background: "var(--surface2, #0c1520)",
    borderRight: "1px solid var(--border, rgba(255,255,255,0.07))",
    padding: "18px",
    gap: "12px",
    overflowY: "auto",
};

// Toggle de modo
const modeToggleStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
    paddingBottom: "12px",
    borderBottom: "1px solid var(--border, rgba(255,255,255,0.07))",
    flexWrap: "wrap",
};

const modeButtonStyle = (isActive: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
    background: isActive ? "rgba(26, 124, 167, 0.15)" : "transparent",
    border: isActive ? "1px solid var(--accent, #1A7CA7)" : "1px solid var(--border, rgba(255,255,255,0.07))",
    color: isActive ? "var(--accent, #1A7CA7)" : "var(--text-muted, #64748B)",
});

const modeButtonTextStyle: React.CSSProperties = {
    display: "inline",
};

// Gallery desktop (vertical)
const galleryRowStyle: React.CSSProperties = {
    display: "flex",
    gap: "10px",
    flex: 1,
    minHeight: "260px",
};

// Imagen grande desktop
const mainImageStyle: React.CSSProperties = {
    flex: 1,
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
    border: "1px solid var(--border, rgba(255,255,255,0.07))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
    minHeight: "200px",
};

const mainImageInnerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

// Gallery móvil
const galleryMobileStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
};

const mainImageMobileStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0, 0, 0, 0.3)",
    borderRadius: "12px",
    border: "1px solid var(--border, rgba(255,255,255,0.07))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    aspectRatio: "16/9",
};

// Placeholder
const imagePlaceholderStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "linear-gradient(135deg, rgba(26,124,167,0.06), rgba(26,124,167,0.02))",
};

const placeholderIconStyle: React.CSSProperties = {
    fontSize: "32px",
    color: "rgba(26,124,167,0.35)",
};

const placeholderLabelStyle: React.CSSProperties = {
    fontSize: "12px",
    color: "var(--text-muted, #64748B)",
    fontWeight: 500,
};

// Miniaturas desktop (vertical)
const thumbnailsContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "8px",
    overflowY: "auto",
    paddingRight: "2px",
};

const thumbnailWrapperStyle = (isSelected: boolean): React.CSSProperties => ({
    width: "54px",
    height: "54px",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.15s",
    border: isSelected ? "2px solid var(--accent, #1A7CA7)" : "1px solid var(--border, rgba(255,255,255,0.07))",
    opacity: isSelected ? 1 : 0.55,
});

// Miniaturas móvil (horizontal)
const thumbnailsHorizontalStyle: React.CSSProperties = {
    display: "flex",
    gap: "8px",
    overflowX: "auto",
    paddingBottom: "4px",
};

const thumbnailHorizontalStyle = (isSelected: boolean): React.CSSProperties => ({
    width: "60px",
    height: "60px",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    flexShrink: 0,
    transition: "all 0.15s",
    border: isSelected ? "2px solid var(--accent, #1A7CA7)" : "1px solid var(--border, rgba(255,255,255,0.07))",
    opacity: isSelected ? 1 : 0.55,
});

const thumbnailInnerStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
};

const thumbnailPlaceholderStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.03)",
    fontSize: "20px",
};

// Columna derecha
const rightColumnStyle: React.CSSProperties = {
    flex: 1,
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    overflowY: "auto",
};

const projectTitleStyle: React.CSSProperties = {
    fontSize: "22px",
    fontWeight: 600,
    color: "#e2e8f0",
    margin: 0,
    letterSpacing: "-0.01em",
    lineHeight: 1.2,
};

const tagRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginTop: "10px",
};

const tagStyle: React.CSSProperties = {
    padding: "3px 10px",
    background: "rgba(26,124,167,0.12)",
    border: "1px solid rgba(26,124,167,0.25)",
    borderRadius: "99px",
    fontSize: "11px",
    color: "var(--accent, #1A7CA7)",
    fontWeight: 500,
};

const dividerStyle: React.CSSProperties = {
    border: "none",
    borderTop: "1px solid var(--border, rgba(255,255,255,0.07))",
    margin: 0,
};

const descriptionTextStyle: React.CSSProperties = {
    fontSize: "13.5px",
    color: "var(--text, #CBD5E1)",
    lineHeight: 1.65,
    margin: 0,
};

const sectionTitleStyle: React.CSSProperties = {
    fontSize: "12px",
    fontWeight: 600,
    color: "var(--text-muted, #64748B)",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    margin: "0 0 8px 0",
};

const featuresListStyle: React.CSSProperties = {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: "7px",
};

const featureItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    textAlign: "left",
    gap: "8px",
    fontSize: "13px",
    color: "var(--text, #CBD5E1)",
};

const featureDotStyle: React.CSSProperties = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "var(--accent, #1A7CA7)",
    flexShrink: 0,
};

const stackContainerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
};

const stackBadgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "3px 9px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--border, rgba(255,255,255,0.07))",
    borderRadius: "6px",
    fontSize: "11px",
    color: "var(--text-muted, #64748B)",
};

const linksRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    paddingTop: "14px",
    borderTop: "1px solid var(--border, rgba(255,255,255,0.07))",
    marginTop: "auto",
};

const linkButtonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    padding: "8px 16px",
    background: "rgba(26,124,167,0.12)",
    border: "1px solid rgba(26,124,167,0.25)",
    borderRadius: "8px",
    color: "var(--accent, #1A7CA7)",
    textDecoration: "none",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s",
};

const closeButtonStyle: React.CSSProperties = {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid var(--border, rgba(255,255,255,0.07))",
    borderRadius: "8px",
    color: "var(--text-muted, #64748B)",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.15s",
};

// ─── Estilos responsivos (CSS global) ──────────────────────────────────────────

const responsiveStyles = `
    /* Estilos base */
    .modal-scroll::-webkit-scrollbar {
        width: 6px;
    }
    .modal-scroll::-webkit-scrollbar-track {
        background: var(--surface2, #0c1520);
        border-radius: 10px;
    }
    .modal-scroll::-webkit-scrollbar-thumb {
        background: rgba(26, 124, 167, 0.3);
        border-radius: 10px;
    }
    .modal-scroll::-webkit-scrollbar-thumb:hover {
        background: rgba(26, 124, 167, 0.5);
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Responsive: Tablets (768px - 1024px) */
    @media (max-width: 1024px) and (min-width: 769px) {
        .modal-container {
            max-width: 95%;
        }
    }

    /* Responsive: Móviles (menos de 768px) */
    @media (max-width: 768px) {
        .modal-container {
            flex-direction: column;
            max-height: 95vh;
            width: 95%;
        }
        
        .left-col {
            flex: none;
            border-right: none;
            border-bottom: 1px solid var(--border, rgba(255,255,255,0.07));
        }
        
        .right-col {
            padding: 20px;
        }
        
        .proj-title {
            font-size: 18px;
        }
        
        .link-btn, .close-btn {
            padding: 6px 12px;
            font-size: 12px;
        }
    }

    /* Responsive: Móviles pequeños (menos de 480px) */
    @media (max-width: 480px) {
        .modal-wrap {
            padding: 12px;
        }
        
        .left-col {
            padding: 12px;
        }
        
        .right-col {
            padding: 16px;
        }
        
        .mode-btn {
            padding: 4px 10px;
            font-size: 10px;
        }
        
        .mode-btn svg {
            width: 12px;
            height: 12px;
        }
        
        .proj-title {
            font-size: 16px;
        }
        
        .tag {
            font-size: 9px;
            padding: 2px 8px;
        }
        
        .desc {
            font-size: 12px;
        }
        
        .section-title {
            font-size: 10px;
        }
        
        .feat-list li {
            font-size: 11px;
        }
        
        .stack-badge {
            font-size: 9px;
            padding: 2px 7px;
        }
        
        .link-btn, .close-btn {
            padding: 5px 10px;
            font-size: 11px;
        }
        
        .thumb {
            width: 45px;
            height: 45px;
        }
        
        .thumbnail-horizontal {
            width: 50px;
            height: 50px;
        }
    }

    /* Aplicar clases responsivas */
    @media (max-width: 768px) {
        .modal-container {
            flex-direction: column !important;
        }
        .principal{
            flex-direction: column;
        }
        
        .left-col {
            flex: none !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border, rgba(255,255,255,0.07)) !important;
        }
        
        .gallery-row {
            flex-direction: column !important;
        }
        
        .thumb-col {
            flex-direction: row !important;
            overflow-x: auto !important;
            max-height: none !important;
            padding-bottom: 4px !important;
        }
        
        .thumb {
            width: 60px !important;
            height: 60px !important;
        }
    }
`;
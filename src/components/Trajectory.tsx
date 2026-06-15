import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { FiAward, FiBookOpen, FiBriefcase, FiCode, FiDownload } from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguageStore } from "../store/languageStore";
import type { UrlInterface } from "./ProjectCard";
import scrumCertificate from "../assets/certificados/scrum.pdf";
import springCertificate from "../assets/certificados/spring.pdf";

type TrajectoryType = "experience" | "academic" | "certificate" | "course";

interface TrajectoryItem {
    year: string;
    title: string;
    subtitle: string;
    description: string;
    type: TrajectoryType;
    side: "left" | "right";
    tags: string[];
    uris?: UrlInterface[];

}

const iconByType = {
    experience: FiBriefcase,
    academic: FiBookOpen,
    certificate: FiAward,
    course: FiCode,
};

const trajectoryProgressGradient = "linear-gradient(180deg, rgba(26, 124, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)";
const trajectoryHorizontalGradient = "linear-gradient(90deg, rgba(26, 124, 180, 1) 0%, rgba(253, 29, 29, 1) 50%, rgba(252, 176, 69, 1) 100%)";

export const TrajectoryComponent = () => {
    const { t, loadTranslations } = useTranslation();
    const translations = t as {
        trajectory?: string;
        trajectoryLabels?: Record<TrajectoryType, string>;
        trajectoryItems?: {
            currentJob?: Partial<TrajectoryItem>;
            softwareEngineering?: Partial<TrajectoryItem>;
            internship?: Partial<TrajectoryItem>;
            scrumCertification?: Partial<TrajectoryItem> & { urlText?: string };
            springBootCourse?: Partial<TrajectoryItem> & { urlText?: string };
        };
    };
    const { lang } = useLanguageStore();
    const timelineRef = useRef<HTMLDivElement>(null);
    const dotRefs = useRef<Array<HTMLDivElement | null>>([]);
    const [dotProgressThresholds, setDotProgressThresholds] = useState<number[]>([]);
    const [activeTimelineItems, setActiveTimelineItems] = useState<boolean[]>([]);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 75%", "end 45%"],
    });

    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const labelByType = {
        experience: translations?.trajectoryLabels?.experience || "Experiencia",
        academic: translations?.trajectoryLabels?.academic || "Academico",
        certificate: translations?.trajectoryLabels?.certificate || "Certificado",
        course: translations?.trajectoryLabels?.course || "Curso",
    };
    const trajectoryItems: TrajectoryItem[] = [
        {
            year: "2024-hoy",
            title: translations?.trajectoryItems?.currentJob?.title || "Full Stack Developer JR",
            subtitle: translations?.trajectoryItems?.currentJob?.subtitle || "Empresa actual (VLIM Soluciones Integrales en TIC)",
            description: translations?.trajectoryItems?.currentJob?.description || "Desarrollo de aplicaciones web y moviles, integrando frontend, backend y bases de datos para resolver flujos reales de negocio.",
            type: "experience",
            side: "left",
            tags: ["React", "Vue.js", "Express.js", "MySQL", "React Native", "PHP", "JavaScript"],
        },
        {
            year: "2022-2025",
            title: translations?.trajectoryItems?.softwareEngineering?.title || "Ingenieria en Software",
            subtitle: translations?.trajectoryItems?.softwareEngineering?.subtitle || "Universidad Tecnologica",
            description: translations?.trajectoryItems?.softwareEngineering?.description || "Formacion academica enfocada en analisis, diseno, desarrollo y mantenimiento de soluciones de software.",
            type: "academic",
            side: "right",
            tags: ["Arquitectura", "Backend", "Frontend"],
        },
        {
            year: "2024",
            title: translations?.trajectoryItems?.internship?.title || "Becario de Desarrollo",
            subtitle: translations?.trajectoryItems?.internship?.subtitle || "Primeras colaboraciones profesionales en VLIM Soluciones Integrales en TIC",
            description: translations?.trajectoryItems?.internship?.description || "Participacion en tareas de desarrollo, correccion de errores e integracion de funcionalidades en proyectos reales.",
            type: "experience",
            side: "left",
            tags: ["PHP", "JavaScript", "MySQL"],

        },

        {
            year: "2024",
            title: translations?.trajectoryItems?.scrumCertification?.title || "Certificacion SCRUM Study",
            subtitle: translations?.trajectoryItems?.scrumCertification?.subtitle || "Certificado / plataforma",
            description: translations?.trajectoryItems?.scrumCertification?.description || "Certificado obtenido tras completar un curso de la metodologia agil scrum SCRUM.",
            type: "certificate",
            side: "right",
            tags: ["Certificacion", "SCRUM"],
            uris: [
                {
                    url: scrumCertificate,
                    text: translations?.trajectoryItems?.scrumCertification?.urlText || "Descargar certificado",
                },
            ],
        },

        {
            year: "2024",
            title: translations?.trajectoryItems?.springBootCourse?.title || "Cursos de spring boot",
            subtitle: translations?.trajectoryItems?.springBootCourse?.subtitle || "Certificado de Spring boot",
            description: translations?.trajectoryItems?.springBootCourse?.description || "Practica constante en tecnologias web usando Spring Boot.",
            type: "course",
            side: "left",
            tags: ["React Native", "Spring Boot", "PostgreSQL"],
            uris: [
                {
                    url: springCertificate,
                    text: translations?.trajectoryItems?.springBootCourse?.urlText || "Descargar certificado",
                },
            ],
        },
    ];

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!dotProgressThresholds.length) return;

        const nextActiveItems = dotProgressThresholds.map((threshold) => latest >= threshold);
        setActiveTimelineItems((current) => {
            const hasChanged = nextActiveItems.some((isActive, index) => current[index] !== isActive);
            return hasChanged ? nextActiveItems : current;
        });
    });

    useEffect(() => { 
        loadTranslations();
    }, [lang]);

    useEffect(() => {
        const measureDotThresholds = () => {
            const timeline = timelineRef.current;
            if (!timeline) return;

            const timelineRect = timeline.getBoundingClientRect();
            const timelineHeight = timelineRect.height || 1;

            const thresholds = dotRefs.current
                .slice(0, trajectoryItems.length)
                .map((dot) => {
                    if (!dot) return 1;

                    const dotRect = dot.getBoundingClientRect();
                    const dotTopInsideTimeline = dotRect.top - timelineRect.top;

                    return Math.min(1, Math.max(0, dotTopInsideTimeline / timelineHeight));
                });

            setDotProgressThresholds(thresholds);
            setActiveTimelineItems(thresholds.map((threshold) => scrollYProgress.get() >= threshold));
        };

        measureDotThresholds();
        window.addEventListener("resize", measureDotThresholds);

        return () => window.removeEventListener("resize", measureDotThresholds);
    }, [lang, trajectoryItems.length, scrollYProgress]);

    return (
        <section className="about trajectory-section" >
            <style>{responsiveTimelineStyles}</style>
            <div className="about__title_container">
                <h2 className="about__title">{translations?.trajectory || "Trayectoria"}</h2>
            </div>

            <div ref={timelineRef} className="trajectory-timeline" style={timelineWrapperStyle}>
                <div className="trajectory-line-track" style={lineTrackStyle} />
                <motion.div className="trajectory-line-progress" style={{ ...lineProgressStyle, scaleY: lineScale }} />

                {trajectoryItems.map((item, index) => {
                    const Icon = iconByType[item.type];
                    const isLeft = item.side === "left";
                    const isActive = activeTimelineItems[index] ?? false;

                    return (
                        <motion.article
                            key={`${item.year}-${item.title}`}
                            className="trajectory-item"
                            initial={{ opacity: 0, y: 42 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.45, delay: index * 0.05 }}
                            style={{
                                ...timelineItemStyle,
                                justifyContent: isLeft ? "flex-start" : "flex-end",
                            }}
                        >
                            <div className="trajectory-year" style={yearStyle}>{item.year}</div>
                            <motion.div
                                ref={(node) => {
                                    dotRefs.current[index] = node;
                                }}
                                className="trajectory-dot"
                                initial={{ scale: 0.7, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 0.35, delay: 0.1 }}
                                style={getDotStyle(isActive)}
                            >
                                <Icon size={18} />
                            </motion.div>

                            <div
                                className="trajectory-connector"
                                style={{
                                    ...getConnectorStyle(isActive),
                                    [isLeft ? "right" : "left"]: "50%",
                                    transform: isLeft ? "translateX(-18px)" : "translateX(18px)",
                                }}
                            />

                            <motion.div
                                className="trajectory-card"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    ...getCardStyle(isActive),
                                    marginLeft: isLeft ? 0 : "auto",
                                    marginRight: isLeft ? "auto" : 0,
                                    textAlign: isLeft ? "right" : "left",
                                }}
                            >
                                <span style={typePillStyle}>{labelByType[item.type]}</span>
                                <h3 style={cardTitleStyle}>{item.title}</h3>
                                <p style={cardSubtitleStyle}>{item.subtitle}</p>
                                <p style={cardDescriptionStyle}>{item.description}</p>
                                <div style={{ ...tagRowStyle, justifyContent: isLeft ? "flex-end" : "flex-start" }}>
                                    {item.tags.map((tag) => (
                                        <span key={tag} style={tagStyle}>{tag}</span>
                                    ))}
                                </div>
                                {item.uris && (
                                    <div style={{ ...linkRowStyle, justifyContent: isLeft ? "flex-end" : "flex-start" }}>
                                        {item.uris.map((uri) => (
                                            <a
                                                key={uri.url}
                                                href={uri.url}
                                                download
                                                style={downloadLinkStyle}
                                            >
                                                <FiDownload size={14} />
                                                {uri.text || "Descargar"}
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        </motion.article>
                    );
                })}
            </div>
        </section>
    );
};

const timelineWrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "min(100%, 980px)",
    margin: "0 auto",
    padding: "30px 0 80px",
};

const lineTrackStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 2,
    transform: "translateX(-50%)",
    background: "rgba(148, 163, 184, 0.2)",
};

const lineProgressStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    width: 2,
    transformOrigin: "top",
    background: trajectoryProgressGradient,
    boxShadow: "0 0 18px rgba(253, 29, 29, 0.28)",
};

const timelineItemStyle: React.CSSProperties = {
    position: "relative",
    display: "flex",
    width: "100%",
    minHeight: 190,
    padding: "22px 0",
};

const yearStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translate(-50%, -12px)",
    padding: "4px 12px",
    borderRadius: 999,
    background: "var(--bg)",
    border: "1px solid rgba(26, 124, 167, 0.35)",
    color: "var(--accent)",
    fontSize: 13,
    fontWeight: 700,
    zIndex: 3,
};

const dotStyle: React.CSSProperties = {
    position: "absolute",
    top: 32,
    left: "50%",
    width: 42,
    height: 42,
    transform: "translateX(-50%)",
    borderRadius: "50%",
    background: "var(--surface, #131c26)",
    border: "2px solid var(--accent)",
    color: "var(--accent)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
    boxShadow: "0 0 0 8px var(--bg), 0 8px 24px rgba(26, 124, 167, 0.25)",
    transition: "border-color 0.5s ease, background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
};

const getDotStyle = (isActive: boolean): React.CSSProperties => ({
    ...dotStyle,
    background: isActive
        ? `linear-gradient(var(--surface, #131c26), var(--surface, #131c26)) padding-box, ${trajectoryProgressGradient} border-box`
        : dotStyle.background,
    border: isActive ? "2px solid transparent" : dotStyle.border,
    color: isActive ? "rgba(252, 176, 69, 1)" : dotStyle.color,
    boxShadow: isActive
        ? "0 0 0 8px var(--bg), 0 0 22px rgba(253, 29, 29, 0.42), 0 8px 26px rgba(252, 176, 69, 0.28)"
        : dotStyle.boxShadow,
});

const connectorStyle: React.CSSProperties = {
    position: "absolute",
    top: 53,
    width: "calc(50% - 300px)",
    minWidth: 70,
    height: 2,
    background: "linear-gradient(90deg, rgba(26, 124, 167, 0.15), var(--accent))",
    transition: "background 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease",
};

const getConnectorStyle = (isActive: boolean): React.CSSProperties => ({
    ...connectorStyle,
    background: isActive ? trajectoryHorizontalGradient : connectorStyle.background,
    boxShadow: isActive ? "0 0 14px rgba(253, 29, 29, 0.34)" : "none",
    opacity: isActive ? 1 : 0.72,
});

const cardStyle: React.CSSProperties = {
    width: "min(42%, 360px)",
    padding: "18px 20px",
    borderRadius: 8,
    background: "rgba(19, 28, 38, 0.82)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    backdropFilter: "blur(10px)",
    color: "var(--text)",
    transition: "border-color 0.5s ease, background 1s ease, box-shadow 0.3s ease, color 0.3s ease",
};

const getCardStyle = (isActive: boolean): React.CSSProperties => ({
    ...cardStyle,
    border: isActive ? "2px solid transparent" : cardStyle.border,
    boxShadow: isActive
        ? "0 0 0 1px rgba(253, 29, 29, 0.3), 0 16px 20px rgba(26, 124, 180, 0.3) "
        : "none",
    background: isActive
        ? "linear-gradient(rgba(19, 28, 38, 0.96), rgba(19, 28, 38, 0.96)) padding-box, linear-gradient(90deg, rgba(26, 124, 180, 0.7), rgba(253, 29, 29, 0.7), rgba(252, 176, 69, .7)) border-box"
        : cardStyle.background,
});

const typePillStyle: React.CSSProperties = {
    display: "inline-flex",
    marginBottom: 8,
    padding: "3px 9px",
    borderRadius: 999,
    background: "rgba(26, 124, 167, 0.12)",
    color: "var(--accent)",
    border: "1px solid rgba(26, 124, 167, 0.25)",
    fontSize: 11,
    fontWeight: 700,
};

const cardTitleStyle: React.CSSProperties = {
    margin: 0,
    padding: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text)",
};

const cardSubtitleStyle: React.CSSProperties = {
    margin: "4px 0 10px",
    color: "var(--accent)",
    fontSize: 13,
    fontWeight: 600,
};

const cardDescriptionStyle: React.CSSProperties = {
    margin: 0,
    color: "var(--text)",
    opacity: 0.78,
    fontSize: 13,
    lineHeight: 1.6,
};

const tagRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 14,
};

const tagStyle: React.CSSProperties = {
    padding: "3px 8px",
    borderRadius: 6,
    background: "rgba(255, 255, 255, 0.04)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    color: "var(--text)",
    opacity: 0.8,
    fontSize: 11,
};

const linkRowStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
};

const downloadLinkStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    padding: "7px 12px",
    borderRadius: 8,
    background: "rgba(26, 124, 167, 0.12)",
    border: "1px solid rgba(26, 124, 167, 0.28)",
    color: "var(--accent)",
    textDecoration: "none",
    fontSize: 12,
    fontWeight: 700,
};

const responsiveTimelineStyles = `
    @media (max-width: 700px) {
        .trajectory-section {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
        }

        .trajectory-timeline {
            width: 100% !important;
            padding-top: 20px !important;
        }

        .trajectory-line-track,
        .trajectory-line-progress {
            left: 22px !important;
        }

        .trajectory-item {
            min-height: auto !important;
            padding: 42px 0 28px 0 !important;
            justify-content: flex-start !important;
        }

        .trajectory-year {
            left: 22px !important;
            transform: translate(-50%, -10px) !important;
        }

        .trajectory-dot {
            left: 22px !important;
            width: 36px !important;
            height: 36px !important;
            box-shadow: 0 0 0 6px var(--bg), 0 8px 24px rgba(26, 124, 167, 0.22) !important;
        }

        .trajectory-connector {
            left: 40px !important;
            right: auto !important;
            width: 34px !important;
            min-width: 34px !important;
            transform: none !important;
        }

        .trajectory-card {
            width: calc(100% - 76px) !important;
            margin-left: 76px !important;
            margin-right: 0 !important;
            text-align: left !important;
    transition: "border-color 0.5s ease, background 1s ease, box-shadow 1s ease, color 1s ease",

            
        }
    }
`;

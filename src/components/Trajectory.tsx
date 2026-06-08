import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

const trajectoryItems: TrajectoryItem[] = [
    {
        year: "2024-actualidad",
        title: "Full Stack Developer JR",
        subtitle: "Empresa actual (VLIM Soluciones Integrales en TIC)",
        description: "Desarrollo de aplicaciones web y moviles, integrando frontend, backend y bases de datos para resolver flujos reales de negocio.",
        type: "experience",
        side: "left",
        tags: ["React", "Vue.js", "Express.js", "MySQL", "React Native", "PHP", "JavaScript"],
    },
     {
        year: "2022-2025",
        title: "Ingenieria en Software",
        subtitle: "Universidad Tecnologica",
        description: "Formacion academica enfocada en analisis, diseno, desarrollo y mantenimiento de soluciones de software.",
        type: "academic",
        side: "right",
        tags: ["Arquitectura", "Backend", "Frontend"],
    },
     {
        year: "2024",
        title: "Becario de Desarrollo",
        subtitle: "Primeras colaboraciones profesionales en VLIM Soluciones Integrales en TIC",
        description: "Participacion en tareas de desarrollo, correccion de errores e integracion de funcionalidades en proyectos reales.",
        type: "experience",
        side: "left",
        tags: ["PHP", "JavaScript", "MySQL"],

    },
   
    {
        year: "2024",
        title: "Certificacion SCRUM Study",
        subtitle: "Certificado / plataforma",
        description: "Certificado obtenido tras completar un curso de la metodologia agil scrum SCRUM.",
        type: "certificate",
        side: "right",
        tags: ["Certificacion", "SCRUM"],
        uris: [
            {
                url: scrumCertificate,
                text: "Descargar certificado",
            },
        ],
    },
   
    {
        year: "2024",
        title: "Cursos de spring boot",
        subtitle: "Certificado de Spring boot",
        description: "Practica constante en tecnologias web usando Spring Boot, .",
        type: "course",
        side: "left",
        tags: ["React Native", "Spring Boot", "PostgreSQL"],
        uris: [
            {
                url: springCertificate,
                text: "Descargar certificado",
            },
        ],
    },
];

const iconByType = {
    experience: FiBriefcase,
    academic: FiBookOpen,
    certificate: FiAward,
    course: FiCode,
};

const labelByType = {
    experience: "Experiencia",
    academic: "Academico",
    certificate: "Certificado",
    course: "Curso",
};

export const TrajectoryComponent = () => {
    const { t, loadTranslations } = useTranslation();
    const translations = t as { trajectory?: string };
    const { lang } = useLanguageStore();
    const timelineRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start 75%", "end 45%"],
    });

    const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    useEffect(() => { 
        loadTranslations();
    }, [lang]);

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
                                className="trajectory-dot"
                                initial={{ scale: 0.7, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true, amount: 0.6 }}
                                transition={{ duration: 0.35, delay: 0.1 }}
                                style={dotStyle}
                            >
                                <Icon size={18} />
                            </motion.div>

                            <div
                                className="trajectory-connector"
                                style={{
                                    ...connectorStyle,
                                    [isLeft ? "right" : "left"]: "50%",
                                    transform: isLeft ? "translateX(-18px)" : "translateX(18px)",
                                }}
                            />

                            <motion.div
                                className="trajectory-card"
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.2 }}
                                style={{
                                    ...cardStyle,
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
    background: "linear-gradient(180deg, var(--accent), rgba(26, 124, 167, 0.15))",
    boxShadow: "0 0 18px rgba(26, 124, 167, 0.45)",
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
};

const connectorStyle: React.CSSProperties = {
    position: "absolute",
    top: 53,
    width: "calc(50% - 300px)",
    minWidth: 70,
    height: 2,
    background: "linear-gradient(90deg, rgba(26, 124, 167, 0.15), var(--accent))",
};

const cardStyle: React.CSSProperties = {
    width: "min(42%, 360px)",
    padding: "18px 20px",
    borderRadius: 8,
    background: "rgba(19, 28, 38, 0.82)",
    border: "1px solid rgba(148, 163, 184, 0.16)",
    backdropFilter: "blur(10px)",
    color: "var(--text)",
};

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
        }
    }
`;

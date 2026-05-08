import { useState, type JSX } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Slide {
  src?: string;
  alt?: string;
  label?: string;
}

interface ProjectSlides {
  desktop?: Slide[];
  mobile?: Slide[];
}

interface Project {
  title: string;
  tags: string[];
  uris?: string[];
  description: string;
  url?: string;
  slides: ProjectSlides;
  selectDefault: string;
}

type ViewMode = "desktop" | "mobile" | "info";

// ─── Icons ────────────────────────────────────────────────────────────────────

const MonitorIcon = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x={2} y={3} width={20} height={14} rx={2} />
    <line x1={8} y1={21} x2={16} y2={21} />
    <line x1={12} y1={17} x2={12} y2={21} />
  </svg>
);

const PhoneIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x={5} y={2} width={14} height={20} rx={2} />
    <line x1={12} y1={18} x2={12.01} y2={18} />
  </svg>
);

const InfoIcon = () => (
  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <circle cx={12} cy={12} r={10} />
    <line x1={12} y1={8} x2={12} y2={8.01} strokeWidth={3} />
    <line x1={12} y1={12} x2={12} y2={16} />
  </svg>
);

const ArrowIcon = ({ dir }: { dir: "left" | "right" }) => (
  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
    <polyline points={dir === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
  </svg>
);

const LinkIcon = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1={10} y1={14} x2={21} y2={3} />
  </svg>
);

// ─── SliderPlaceholder ────────────────────────────────────────────────────────

const SliderPlaceholder = ({ label, index }: { label: string; index: number }) => {
  const bgs = [
    "rgba(26,124,167,0.08)",
    "rgba(26,100,140,0.06)",
    "rgba(20,80,110,0.10)",
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: bgs[index % 3], display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(26,124,167,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="rgba(26,124,167,0.5)" strokeWidth={1.5}>
          <rect x={3} y={3} width={18} height={18} rx={2} />
          <circle cx={8.5} cy={8.5} r={1.5} />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <span style={{ fontSize: 11, color: "#64748B", fontFamily: "monospace" }}>{label}</span>
    </div>
  );
};

// ─── ImageSlider ──────────────────────────────────────────────────────────────

interface ImageSliderProps {
  slides: ProjectSlides;
  activeView: ViewMode;
}

const ImageSlider = ({ slides, activeView }: ImageSliderProps) => {
  const [index, setIndex] = useState(0);
  const currentSlides: Slide[] = (activeView === "mobile" ? slides.mobile : slides.desktop ? slides.desktop : []) ?? [];
  const total = currentSlides.length;

  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16/10", background: "var(--surface2)", overflow: "hidden", backgroundColor: "#ffff" }}>
      {/* Track */}
      <div style={{ display: "flex", width: "100%", height: "100%", transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)", transform: `translateX(-${index * 100}%)` }}>
        {currentSlides.map((slide, i) => (
          <div key={i} style={{ minWidth: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {slide.src ? (
              <img src={slide.src} alt={slide.alt ?? ""} style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }} />
            ) : (
              <SliderPlaceholder label={slide.label ?? `Vista ${i + 1}`} index={i} />
            )}
          </div>
        ))}
      </div> 

      {/* Arrows */}
      {total > 1 && (
        <>
          <div onClick={prev} aria-label="Anterior" style={arrowStyle("left")}>
            <ArrowIcon dir="left" />
          </div>
          <div onClick={next} aria-label="Siguiente" style={arrowStyle("right")}>
            <ArrowIcon dir="right" />
          </div>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div style={{ position: "absolute", bottom: 8, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 5 }}>
          {currentSlides.map((_, i) => (
            <div key={i} onClick={() => setIndex(i)} style={dotStyle(i === index)} />
          ))}
        </div>
      )}
    </div>
  );
};

const arrowStyle = (side: "left" | "right"): React.CSSProperties => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [side]: 8,
  width: 28,
  height: 28,
  background: "rgba(14,20,27,0.7)",
  border: "1px solid rgba(26,124,167,0.35)",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  zIndex: 10,
  color: "#CBD5E1",
  backdropFilter: "blur(4px)",
});

const dotStyle = (active: boolean): React.CSSProperties => ({
  width: 5,
  height: 5,
  borderRadius: "50%",
  background: active ? "var(--accent)" : "rgba(203,213,225,0.35)",
  cursor: "pointer",
  transform: active ? "scale(1.3)" : "scale(1)",
  transition: "background 0.2s, transform 0.2s",
});

// ─── ProjectCard ──────────────────────────────────────────────────────────────

interface ViewOption {
  key: ViewMode;
  icon: JSX.Element;
  label: string;
}
 
const ProjectCard = ({ project }: { project: Project }) => {
  const [activeView, setActiveView] = useState<ViewMode>(project.selectDefault);

  const viewOptions: ViewOption[] = [

    ...(project.slides.desktop ? [{ key: "Desktop" as ViewMode, icon: <MonitorIcon />, label: "Desktop" }] : []),
    ...(project.slides.mobile ? [{ key: "mobile" as ViewMode, icon: <PhoneIcon />, label: "Móvil" }] : []),
    { key: "info", icon: <InfoIcon />, label: "Info" },
  ];

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, maxWidth: "350px", overflow: "hidden" }}>
      {/* Slider or Info panel */}
      {activeView !== "info" ? (
        <ImageSlider slides={project.slides} activeView={activeView} />
      ) : (
        <div style={{ minHeight: 212, display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem", background: "var(--surface2)", borderBottom: "1px solid var(--border)" }}>
          <p style={{ textAlign: "center", fontSize: 13, color: "#64748B", lineHeight: 1.7 }}>{project.description}</p>
        </div>
      )}

      {/* View tabs */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px 0" }}>
        {viewOptions.map((v) => (
          <div
            key={v.key}
            onClick={() => setActiveView(v.key)}
            title={v.label}
            style={{
              width: 32, height: 32, borderRadius: "10%",
              border: `1px solid ${activeView === v.key ? "var(--accent)" : "var(--border)"}`,
              background: activeView === v.key ? "rgba(26,124,167,0.12)" : "transparent",
              color: activeView === v.key ? "var(--accent)" : "#64748B",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.15s",
            }}
          >
            {v.icon}
          </div>
        ))}
        <span style={{ fontSize: 10, color: "#64748B", fontFamily: "monospace", marginLeft: 2 }}>
          {viewOptions.find((v) => v.key === activeView)?.label}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 16px 18px" }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#e2e8f0", marginBottom: 8, letterSpacing: "-0.01em" }}>
          {project.title}
        </h3>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 9px", background: "rgba(26,124,167,0.12)", border: "1px solid rgba(26,124,167,0.18)", borderRadius: 99, fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", opacity: 0.7 }} />
              {tag}
            </span>
          ))}
        </div>

        <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.6, marginBottom: 14 }}>
          {project.description}
        </p>

        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "rgba(26,124,167,0.12)", border: "1px solid rgba(26,124,167,0.35)", borderRadius: 8, color: "var(--accent)", fontSize: 13, fontWeight: 500, textDecoration: "none" }}
          >
            <LinkIcon />
            Ver sitio
          </a>
        )}
      </div>
    </div>
  );
};


// Named export for use in other files
export { ProjectCard };
export type { Project, Slide, ProjectSlides, ViewMode };
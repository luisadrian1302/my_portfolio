import type { ProjectSlides, UrlInterface } from "../components/ProjectCard";

export interface ModalContentItem {
  type: "title" | "subtitle" | "paragraph" | "list" | "tech_badge" | "link";
  value: string;
  items?: string[]; // para listas
}

export interface ProjectDetailedInfo {
  title: string;
  subtitle?: string;
  content: ModalContentItem[];
  liveUrl?: string;
  repoUrl?: string;
}


// ─── Tipos para contenido dinámico del modal ───────────────────────────────────
// ─── Tipos para contenido dinámico del modal ───────────────────────────────────

// Tipos de secciones disponibles
export type SectionType = 
  | "title"
  | "paragraph"
  | "list"
  | "tech_stack"
  | "divider"
  | "custom";

// Interfaz base para cualquier sección
export interface BaseSection {
  type: SectionType;
  id?: string;
}

// Sección de título
export interface TitleSection extends BaseSection {
  type: "title";
  content: string;
  level?: 1 | 2 | 3; // h1, h2, h3
}

// Sección de párrafo
export interface ParagraphSection extends BaseSection {
  type: "paragraph";
  content: string;
}

// Sección de lista
export interface ListSection extends BaseSection {
  type: "list";
  title?: string;
  items: string[];
  variant?: "bullets" | "checkmarks" | "numbers" | "dots";
}

// Sección de stack tecnológico
export interface TechStackSection extends BaseSection {
  type: "tech_stack";
  title?: string;
  technologies: Array<{
    name: string;
    icon?: string;
    color?: string;
  }>;
}

// Sección de divisor
export interface DividerSection extends BaseSection {
  type: "divider";
}

// Sección personalizada
export interface CustomSection extends BaseSection {
  type: "custom";
  component: React.ReactNode;
}

// Unión de todos los tipos de sección
export type ModalSection =
  | TitleSection
  | ParagraphSection
  | ListSection
  | TechStackSection
  | DividerSection
  | CustomSection;


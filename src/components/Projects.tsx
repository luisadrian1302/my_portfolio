import { ProjectCard, type Project } from "./ProjectCard";
import { useTranslation } from "../hooks/useTranslation";
import { useEffect, useState } from "react";

import inicio from "../assets/images/Inicio.jpg"
import inicio_op from "../assets/images/Inicio_op.jpg"
import crear_orden_compra from "../assets/images/crear_orden_compra.jpg"
import crear_orden_compra_proveedores from "../assets/images/crear_orden_compra_proveedores.jpg"


import inicio_phone from "../assets/images/inicio_phone.jpg"
import inicio_oc_phone from "../assets/images/inicio_oc_phone.jpg"
import crear_orden_compra_phone from "../assets/images/crear_orden_compra_phone.jpg"
import crear_orden_compra_prov_phone from "../assets/images/crear_orden_compra_prov_phone.jpg"

import inicio_expo from "../assets/images/expo/inicio.jpg"
import subzonas from "../assets/images/expo/subzonas.jpg"
import zonas_1 from "../assets/images/expo/zonas_1.jpg"
import zonas from "../assets/images/expo/zonas.jpg"

import inicio_eq from "../assets/images/equilibrio/inicio.jpg"
import qr from "../assets/images/equilibrio/qr.jpg"
import recuperar_contraseña from "../assets/images/equilibrio/recuperar_contraseña.jpg"
import { useLanguageStore } from "../store/languageStore";


import login_track from "../assets/images/trackit/login_track.jpeg"
import register_track from "../assets/images/trackit/register_track.jpeg"
import vehiculos_track from "../assets/images/trackit/vehiculos_track.jpeg"
import embaeques_conf from "../assets/images/trackit/embaeques_conf.jpeg"
import punto_entrega from "../assets/images/trackit/punto_entrega.jpeg"
import graficas_track from "../assets/images/trackit/graficas_track.jpeg"
import { ProjectModal } from "./ProjectModal";


export const ProjectComponent = () => {
    const { t, loadTranslations } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const { setLang, lang } = useLanguageStore();


    // ─── Demo usage ───────────────────────────────────────────────────────────────

    const getProjects = (): Project[] => [
        {
            title: t?.projects?.mayakoba?.title || "Proyecto Finanzas Mayakoba",
            tags: ["PHP", "MySQL", "JavaScript", "CSS"],
            description: t?.projects?.mayakoba?.description || "Participé en la creación de los módulos Orden de Compras y Orden de Pago (Las capturas tienen datos simulados para fines de demostración).",
            url: "https://mayakoba.com/",
            slides: {
                desktop: [
                    { src: inicio, alt: "Inicio" },
                    { src: crear_orden_compra, alt: "Crear orden de compra" },
                    { src: crear_orden_compra_proveedores, alt: "crear orden de compra proveedores" },
                    { src: inicio_op, alt: "Inicio de orden de pago" },
                ],
                mobile: [
                    { src: inicio_phone, alt: "Vista móvil" },
                    { src: inicio_oc_phone, alt: "Crear orden de compral" },
                    { src: crear_orden_compra_phone, alt: "crear orden de compra proveedores" },
                    { src: crear_orden_compra_prov_phone, alt: "Inicio de orden de pago" },
                ],
            },
            selectDefault: "desktop",



            modalContent: [
                { type: "divider" },

                {
                    type: "paragraph",
                    content: t?.projects?.mayakoba?.modalContent?.overview
                },

                {
                    type: "list",
                    title: t?.projects?.mayakoba?.modalContent?.mainFeaturesTitle,
                    items: t?.projects?.mayakoba?.modalContent?.mainFeatures,
                    variant: "dots"
                },

                {
                    type: "list",
                    title: t?.projects?.mayakoba?.modalContent?.participationTitle,
                    items: t?.projects?.mayakoba?.modalContent?.participation,
                    variant: "dots"
                },

                {
                    type: "tech_stack",
                    title: t?.projects?.mayakoba?.modalContent?.stackTitle,
                    technologies: [
                        { name: "PHP", icon: "🐘" },
                        { name: "MySQL", icon: "🗄️" },
                        { name: "JavaScript", icon: "🟨" },
                        { name: "CSS", icon: "🎨" },
                        { name: "APIs REST", icon: "🔗" }
                    ]
                }
            ]




        },
        {
            title: t?.projects?.expomex?.title || "Expomex",
            tags: ["Vue.js", "MySQL", "Node.js", "Typescript", "Express.js"],
            description: t?.projects?.expomex?.description || "Ayudé a colaborar en el mantenimiento y corrección de errores de esta aplicación web.",
            url: "https://expomex.com/",
            slides: {
                desktop: [
                    { src: inicio_expo, alt: "Login" },
                    { src: subzonas, alt: "subzonas" },
                    { src: zonas_1, alt: "zonas" },
                    { src: zonas, alt: "zonas" },
                ],
            },
            selectDefault: "desktop"

        },
        {
            title: t?.projects?.equilibrio?.title || "Proyecto Equilibrio total",
            tags: ["Flutter", "MySQL", "PHP"],
            description: t?.projects?.equilibrio?.description || "Desarrollé una aplicación móvil para registrar asistencias del personal de Equilibrio Total mediante códigos QR",
            slides: {
                mobile: [
                    { src: inicio_eq, alt: "Login" },
                    { src: qr, alt: "Qr" },
                    { src: recuperar_contraseña, alt: "recuperar contraseña" },
                ],
            },
            selectDefault: "mobile"

        },
        {
            title: t?.projects?.trackit?.title || "HPL trackit",
            tags: ["React native", "MySQL", "Express.js"],
            description: t?.projects?.trackit?.description || "Desarrollé una aplicación móvil tipo Uber enfocada en transportistas y servicios de carga. La plataforma permite solicitar viajes para el traslado de productos o mercancías, con seguimiento en tiempo real y gestión de transportes y choferes.",
            uris: [{
                url: "https://play.google.com/store/apps/details?id=com.hpltrackit.trackit&pcampaignid=web_share",
                icon: "PlayStore",
                text: "Ver en Android"
                ,
            }, {
                url: "https://apps.apple.com/mx/app/hpl-track-it/id6758738570",
                icon: "apple",
                text: "Ver en IOS"
            }],
            slides: {
                mobile: [
                    { src: login_track, alt: "Login" },
                    { src: register_track, alt: "Registro" },
                    { src: vehiculos_track, alt: "Vehículos" },
                    { src: embaeques_conf, alt: "Configuración de embarques" },
                    { src: punto_entrega, alt: "Punto de entrega" },
                    { src: graficas_track, alt: "Gráficas" },
                ],
            },

            selectDefault: "mobile"

        },
    ];

    useEffect(() => {
        loadTranslations();


    }, [lang]);
    useEffect(() => {
        console.log(t);
        setProject(getProjects());

    }, [t]);
    useEffect(() => {
        loadTranslations();

    }, []);

    const [projects, setProject] = useState<Project[]>([]);



    return (


        <div className="projects">
            <div className="about__title_container" style={{ maxWidth: "1200px" }}>

                <h2 className="about__title" style={{ marginBottom: "40px" }}>
                    {t?.Projects}
                </h2>

                <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", justifyContent: "center", padding: "2rem", background: "var(--bg)", minHeight: "100vh" }}>
                    {projects.map((p, i) => (
                        <ProjectCard key={i} project={p} />
                    ))}
                </div>
            </div>
            {/* Modal */}


        </div>
    )
}
import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { getColours } from "../config/theme/theme";

export const getparticleOptionsDos: ISourceOptions = (theme: string, position?: string) => {
    return {
        background: {
            color: {
                value: getColours(theme).background,
            },
        },
        fpsLimit: 120,
        interactivity: {
            events: {

                onHover: {
                    enable: true,
                    mode: "grab",
                },
            },
            modes: {
                push: {
                    quantity: 1,
                },
                grab: {
                    distance: 0,
                    duration: 0.5,
                },
            },
        },
        particles: {
            color: {
                value: [
                    getColours(theme).text,
                    getColours(theme).accent,
                    getColours(theme).accent2,

                ]
            },
            links: {
                color: getColours(theme).text,
                distance: 0,
                enable: true,
                opacity: 0.5,
                width: .5,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.out,
                },
                random: false,
                speed: 0.5,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                },
                value: 50,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 2 },
            },
        },
        detectRetina: false,
        style: {
            position: position || 'absolute',
            zIndex: -1,
        }

    }
}
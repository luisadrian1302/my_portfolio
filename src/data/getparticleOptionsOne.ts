import {
    type Container,
    type ISourceOptions,
    MoveDirection,
    OutMode,
} from "@tsparticles/engine";
import { getColours } from "../config/theme/theme";

export const getparticleOptionsOne: ISourceOptions = (theme: string, position?: string) => {
    return {
        background: {
            color: {
                value: getColours(theme).background,
            },
        },


        fpsLimit: 120,
        particles: {
            color: {
                value: [
                    getColours(theme).text,
                    getColours(theme).accent,
                    getColours(theme).accent2,

                ]
            },

            move: {
                enable: true,
                speed: 1,
                direction: MoveDirection.none,
                outModes: {
                    default: OutMode.out
                }

            },
            links: {
                distance: 200, 
                opacity: 0.00,
                width: 0.5,
                color: "#00ffff"
            },
            number: {
                density: {
                    enable: true
                },
                value: 360,
            },
            opacity: {
                value: { min: 0.01, max: 0.05 },
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0,
                    sync: true
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: { min: 1, max: 2 }
            },

        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: ["connect", "bubble", "grab"],

                }
            },
            modes: {
                grab: {
                    distance: 100,


                },
                bubble: {
                    distance: 900,
                    size: {
                        value: { min: .1, max: 1.2 }
                    },
                    opacity: 1,


                },
                connect: {

                    opacity: 0,
                    distance: 120,
                        color: "#00ffff",

                    radius: 350,
                    links: {
                        distance: 400,
                        enable: true,
                        color: "#00ffff",
                        opacity: .2,

                    }
                }

            }
        },
        detectRetina: false,
        style: {
            position: position || 'absolute',
            zIndex: -1,
        }

    }
}
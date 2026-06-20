import { memo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type ParticleBackgroundProps = {
  id: string;
  particlesOption?: ISourceOptions;
};

let particlesEnginePromise: Promise<void> | undefined;

const initializeParticlesEngine = () => {
  if (!particlesEnginePromise) {
    particlesEnginePromise = initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    });
  }

  return particlesEnginePromise;
};

export const ParticleBackground = memo(
  ({ id, particlesOption = {} }: ParticleBackgroundProps) => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
      let mounted = true;

      initializeParticlesEngine().then(() => {
        if (mounted) setInitialized(true);
      });

      return () => {
        mounted = false;
      };
    }, []);

    const particlesLoaded = async (_container?: Container): Promise<void> => {};

    if (!initialized) return null;

    return (
      <Particles
        id={id}
        particlesLoaded={particlesLoaded}
        options={particlesOption}
      />
    );
  },
);

import { useEffect, useMemo } from 'react';
import { usePortfolioStore } from './store/store';
import "./styles/_variables.scss";
import "./styles/app.scss";
import "./styles/styles.scss";
import { useTranslation } from './hooks/useTranslation';
import { useLanguageStore } from './store/languageStore';
import { FaArrowDown } from 'react-icons/fa6';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { Header } from './components/header';
import { ParticleBackground } from './components/ParticleBackground';
import { getparticleOptionsOne } from './data/getparticleOptionsOne';
import { getparticleOptionsDos } from './data/getparticleOptionsDos';
import { AboutComponent } from './components/About';
import { ProjectComponent } from './components/Projects';
import { TrajectoryComponent } from './components/Trajectory';

const contactLinks = {
  linkedin: "https://www.linkedin.com/in/luis-adrian-1a2b81223/",
  email: "mailto:lm0336172@gmail.com",
  github: "https://github.com/luisadrian1302",
};

type AppTranslations = {
  greeting?: string;
  first_name?: string;
  job?: string;
  btn_first?: string;
  footer?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    linkedin?: string;
    email?: string;
    github?: string;
    copyright?: string;
  };
};

type ParticleOptionsFactory = (theme: string | undefined, position: string) => object;
const createParticleOptionsOne = getparticleOptionsOne as unknown as ParticleOptionsFactory;
const createParticleOptionsDos = getparticleOptionsDos as unknown as ParticleOptionsFactory;

function App() {
  const theme = usePortfolioStore((state) => state.theme);
  const { t, loadTranslations } = useTranslation();
  const { lang } = useLanguageStore();
  const copy = t as AppTranslations;
  const footerCopy = copy.footer || {};
  const particlesOptionsOne = useMemo(
    () => createParticleOptionsOne(theme, "absolute"),
    [theme],
  );
  const particlesOptionsDos = useMemo(
    () => createParticleOptionsDos(theme, "fixed"),
    [theme],
  );

  useEffect(() => {
    loadTranslations();
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    loadTranslations();
  }, [lang]);

  return (
    <>
      <Header />
      <div
        style={{ position: 'relative', zIndex: 2, transition: "all 1s ease-in-out" }}
      >
        <div className="presentation" style={{ position: 'relative', zIndex: 1 }} id="home">
          <ParticleBackground id="tsparticles" particlesOption={particlesOptionsOne} />
          <div className="contenedor-presentation">
            <h1 style={{ textAlign: "center" }}>
              {copy.greeting} <span className="accent-text">{copy.first_name}</span>
            </h1>
            <h1 style={{ textAlign: "center" }}>{copy.job}</h1>
            <button
              className="btn-accent-outline"
              style={{
                padding: "10px 90px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                const section = document.getElementById("about");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              {copy.btn_first} <FaArrowDown style={{ marginLeft: "15px" }} />
            </button>
          </div>
        </div>

        <ParticleBackground id="tsparticles2" particlesOption={particlesOptionsDos} />

        <div id="about" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative', zIndex: 100 }}>
            <AboutComponent />
          </div>
        </div>

        <div
          id="trajectory"
          style={{ position: 'relative', zIndex: 0, minHeight: "100vh" }}
        >
          <TrajectoryComponent />
        </div>

        <div
          id="projects"
          style={{ position: 'relative', zIndex: 1, minHeight: "100vh" }}
        >
          <ProjectComponent />
        </div>

        <footer className="portfolio-footer" id='contact'>
          <div className="portfolio-footer__content">
            <div className="portfolio-footer__copy">
              <span className="portfolio-footer__eyebrow">{footerCopy.eyebrow}</span>
              <h2>{footerCopy.title}</h2>
              <p>{footerCopy.description}</p>
            </div>

            <div className="portfolio-footer__links">
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={footerCopy.linkedin}
                title={footerCopy.linkedin}
              >
                <FaLinkedinIn />
                <span>{footerCopy.linkedin}</span>
              </a>
              <a
                href={contactLinks.email}
                aria-label={footerCopy.email}
                title={footerCopy.email}
              >
                <FiMail />
                <span>{footerCopy.email}</span>
              </a>
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noreferrer"
                aria-label={footerCopy.github}
                title={footerCopy.github}
              >
                <FaGithub />
                <span>{footerCopy.github}</span>
              </a>
            </div>
          </div>

          <p className="portfolio-footer__copyright">{footerCopy.copyright}</p>

          {/* <div className="portfolio-footer-color"></div> */}
        </footer>
      </div>
    </>
  );
}

export default App;

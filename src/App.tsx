import { useEffect } from 'react';
import { usePortfolioStore } from './store/store';
import "./styles/_variables.scss";
import "./styles/app.scss";
import "./styles/styles.scss";
import { useTranslation } from './hooks/useTranslation';
import { useLanguageStore, type Language } from './store/languageStore';
import { FaArrowDown } from 'react-icons/fa6';
import { Header } from './components/header';
import { ParticleBackground } from './components/ParticleBackground';
import { getparticleOptionsOne } from './data/getparticleOptionsOne';
import { getparticleOptionsDos } from './data/getparticleOptionsDos';
import { AboutComponent } from './components/About';
import { ProjectComponent } from './components/Projects';



function App() {

  const { theme, setTheme } = usePortfolioStore(); // ✅ hook aquí
  const { t, loadTranslations, loadingTranslation } = useTranslation();

  const { setLang, lang } = useLanguageStore();


  const refreshScreen = () => {
    loadTranslations();
  }

  useEffect(() => {
    console.log(theme);

    refreshScreen();
  }, []);


  useEffect(() => {
    // Si theme es undefined, no seteamos light → queda dark
    if (theme === "light") {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [theme]);

  useEffect(() => {
    loadTranslations();
  }, [lang]);

  const handleChangeTranslation = async (lenguaje: Language) => {
    setLang(lenguaje);

  };




  return (
    <>
      <Header t={t} />
      <div className=""
        style={{ position: 'relative', zIndex: 2, transition: "all 1s ease-in-out", }}
      >

        <div className="presentation" style={{ position: 'relative', zIndex: 1 }} id='home'>


          <ParticleBackground id={"tsparticles"} particlesOption={getparticleOptionsOne(theme, "absolute")} />
          <div className="contenedor-presentation">
            <h1 style={{ textAlign: "center" }}>{t.greeting}  <span className="accent-text">{t.first_name}</span></h1>
            <h1 style={{ textAlign: "center" }}>{t.job}</h1>
            <button
              className='btn-accent-outline'
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
              {t.btn_first} <FaArrowDown style={{ marginLeft: "15px" }} />
            </button>

          </div>

        </div>


        <ParticleBackground id={"tsparticles2"} particlesOption={getparticleOptionsDos(theme, "fixed")} />
        <div id='about'
          style={{ position: 'relative', zIndex: 1 }}
        >



          <div className=""
            style={{ position: 'relative', zIndex: 100, }}
          >

            <AboutComponent />


          </div>

        </div>

         <div id='projects'
          style={{ position: 'relative', zIndex: 1, minHeight: "100vh"}}
        >
          <ProjectComponent/>



          

        </div>

           <div id='contact'
          style={{ position: 'relative', zIndex: 1, height: "100vh" }}
        >



          

        </div>

       

      </div>




    </>
  )
}

export default App


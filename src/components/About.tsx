import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from '../hooks/useTranslation';
import { useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';

const skills = [
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    size: 'medium',
  },
  {
    name: 'React Native',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    size: 'medium',
    color: '#61DAFB',
  },
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    size: 'medium',
    color: '#61DAFB',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    size: 'medium',
  },
  {
    name: 'AWS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
    size: 'large',
    color: '#FF9900',
  },
  {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    size: 'medium',
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg',
    size: 'medium',
  },
  {
    name: 'Spring Boot',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',
    size: 'large',
    color: '#6DB33F',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    size: 'medium',
  },
  {
    name: 'Postgres',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    size: 'large',
  },
];

export const AboutComponent = () => {
  const { t, loadTranslations } = useTranslation();
  const { setLang, lang } = useLanguageStore();

  useEffect(() => {
    loadTranslations();


  }, [lang]);

  return (
    <div className="about" style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <div className="about__title_container">

        <h2 className="about__title">
          {t?.about}

        </h2>
      </div>

      <div className="about__content" style={{
        alignItems: "center", flex: 1

      }}>
        {/* Left side */}
        <div className="about__left">
          <div className="about__avatar">
            <FontAwesomeIcon icon={faUser} className="about__avatar-icon" />
          </div>
          <div>
            <p className="about__bio">
              {t?.aboutDesc1}
            </p>

            <p className="about__bio">
              {t?.aboutDesc2}

            </p>
          </div>
        </div>

        {/* Right side - Skills grid */}
        <div className="about__right">
          <div className="about__skills">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`about__skill-card about__skill-card--${skill.size} box inner`}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="about__skill-icon"
                />
                <span className="about__skill-name">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

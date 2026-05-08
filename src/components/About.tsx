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
    <div className="about">
      <div className="about__title_container">

        <h2 className="about__title">
          {t?.about}

        </h2>
      </div>

      <div className="about__content" >
        {/* Left side */}
        <div className="about__left" style={{width: "50%"}} >
          <div className="about__avatar">
            <FontAwesomeIcon icon={faUser} className="about__avatar-icon" />
          </div>
          <p className="about__bio">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.  It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </div>

        {/* Right side - Skills grid */}


        <div className="" style={{width: "50%"}} > 

          <div className="about__skills" style={{width: "80%", margin: "auto"}}>
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

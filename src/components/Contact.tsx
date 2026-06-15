import { useEffect, useMemo, useState, type FormEvent } from "react";
import { FiMail, FiMapPin, FiMessageSquare, FiSend, FiUser } from "react-icons/fi";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguageStore } from "../store/languageStore";

const contactEmail = "lm0336172@gmail.com";

export const ContactComponent = () => {
  const { t, loadTranslations } = useTranslation();
  const { lang } = useLanguageStore();
  const translations = t as {
    contact?: string;
    contactTitle?: string;
    contactSubtitle?: string;
    contactName?: string;
    contactEmail?: string;
    contactMessage?: string;
    contactSend?: string;
    contactLocation?: string;
    contactDirect?: string;
  };

  const copy = useMemo(() => {
    const isEnglish = lang === "en";

    return {
      title: translations.contactTitle || translations.contact || (isEnglish ? "Contact" : "Contacto"),
      subtitle:
        translations.contactSubtitle ||
        (isEnglish
          ? "Have an idea, a project, or a role where I can help? Send me a message and let's talk."
          : "¿Tienes una idea, un proyecto o una oportunidad donde pueda aportar? Escríbeme y platicamos."),
      name: translations.contactName || (isEnglish ? "Your name" : "Tu nombre"),
      email: translations.contactEmail || (isEnglish ? "Your email" : "Tu correo"),
      message: translations.contactMessage || (isEnglish ? "Tell me about your project" : "Cuéntame sobre tu proyecto"),
      send: translations.contactSend || (isEnglish ? "Send message" : "Enviar mensaje"),
      location: translations.contactLocation || (isEnglish ? "Mexico" : "México"),
      direct: translations.contactDirect || (isEnglish ? "Direct email" : "Correo directo"),
    };
  }, [lang, translations]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    loadTranslations();
  }, [lang]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(`Contacto portafolio - ${form.name || "Nuevo mensaje"}`);
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nCorreo: ${form.email}\n\nMensaje:\n${form.message}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="contact">
      <div className="about__title_container">
        <h2 className="about__title">{copy.title}</h2>
      </div>

      <div className="contact__content">
        <div className="contact__intro">
          <span className="contact__eyebrow">
            <FiMessageSquare />
            {copy.direct}
          </span>
          <p className="contact__description">{copy.subtitle}</p>

          <div className="contact__info-list">
            <a className="contact__info-item" href={`mailto:${contactEmail}`}>
              <FiMail />
              <span>{contactEmail}</span>
            </a>
            <div className="contact__info-item">
              <FiMapPin />
              <span>{copy.location}</span>
            </div>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <label className="contact__field">
            <span>{copy.name}</span>
            <div className="contact__input-wrap">
              <FiUser />
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                required
              />
            </div>
          </label>

          <label className="contact__field">
            <span>{copy.email}</span>
            <div className="contact__input-wrap">
              <FiMail />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                required
              />
            </div>
          </label>

          <label className="contact__field">
            <span>{copy.message}</span>
            <textarea
              name="message"
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              required
            />
          </label>

          <button className="btn-accent-outline contact__submit" type="submit">
            {copy.send}
            <FiSend />
          </button>
        </form>
      </div>
    </section>
  );
};

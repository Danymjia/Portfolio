import '../components/button.css';
import Navbar from '../components/Navbar';
import FAQAccordion from '../components/FAQAccordion';
import { FadeInLeft, FadeInRight, FadeInDown, FadeInUpScroll, FadeInLeftScroll, FadeInRightScroll } from '../components/HeroAnimations';
import LogoLoop from '../components/LogoLoop';
import MagicRings from '../components/MagicRings';
import HeroScrollText from '../components/HeroScrollText';
import CurvedLoop from '../components/CurvedLoop';
import OrbitImages from '../components/OrbitImages';
import SobreMiSection from '../components/SobreMiSection';
import ProyectosSection from '../components/ProyectosSection';
import PinnedFAQFooter from '../components/PinnedFAQFooter';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPython, SiPostgresql, SiFirebase } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPython />, title: "Python", href: "https://python.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://postgresql.org" },
  { node: <SiFirebase />, title: "Firebase", href: "https://firebase.google.com" },
];


export const revalidate = 0; // Ensures fresh data for MVP

export default async function LandingPage() {
  const projects = [
    {
      id: 1,
      title: 'Mejiabritoart website',
      description: 'Sitio web para un artista plástico, con galería de obras y formulario de contacto.',
      image_url: null,
      demo_url: 'https://mejia-brito-art.vercel.app',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'App Móvil PoliRed',
      description: 'Aplicación nativa para la red de comercios locales con geolocalización.',
      image_url: null,
      demo_url: '#',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Fundacion DILO website',
      description: 'Plataforma para la Fundación DILO, para Terapias Avanzadas para el Desarrollo.',
      image_url: null,
      demo_url: 'https://fundacion-dilo.vercel.app',
      created_at: new Date().toISOString()
    }
  ];
  
  const leftProjects = projects.filter((_, i) => i % 2 === 0);
  const rightProjects = projects.filter((_, i) => i % 2 === 1);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden' }}>
          {/* Background Magic Rings */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6, pointerEvents: 'none' }}>
            <MagicRings
              color="#ffffff"
              colorTwo="#696a88"
              ringCount={7}
              speed={1}
              attenuation={10}
              lineThickness={2}
              baseRadius={0.35}
              radiusStep={0.1}
              scaleRate={0.1}
              opacity={1}
              blur={0}
              noiseAmount={0.1}
              rotation={0}
              ringGap={1.5}
              fadeIn={0.7}
              fadeOut={0.5}
              followMouse={false}
              mouseInfluence={0.2}
              hoverScale={1.2}
              parallax={0.05}
              clickBurst={false}
            />
          </div>

          <FadeInRight className="hero-details" style={{ position: 'absolute', top: 'clamp(2.5rem, 2vh, 40px)', left: 'clamp(1rem, 3vw, 40px)', zIndex: 10, textAlign: 'left', maxWidth: '650px' }}>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: '#ffffff', lineHeight: 1.3, marginBottom: '0', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', textShadow: '0px 4px 20px rgba(0,0,0,0.5)' }}>
              Diseñador <span style={{ color: 'var(--color-text-muted)' }}>UX/UI</span> & <br />
              Desarrollador <span style={{ color: 'var(--color-text-muted)' }}>Full Stack</span>
            </h1>
          </FadeInRight>

          <div className="container animate-fade-up" style={{ position: 'relative', zIndex: 1, width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '3rem 1rem 4rem 1rem' }}>
            <HeroScrollText />
          </div>
        </section>

        {/* Curved Loop Section */}
        <section style={{ overflow: 'hidden', padding: '0.5rem 0', marginTop: '1rem', marginBottom: '10rem' }}>
          <CurvedLoop 
            marqueeText="UX/UI DESIGNER ✦ FULL STACK DEVELOPER ✦ "
            speed={1}
            curveAmount={0}
            direction="left"
            interactive={true}
          />
        </section>

        <SobreMiSection
          techLogosSlot={
            <LogoLoop logos={techLogos} speed={40} direction="left" logoHeight={50} gap={50} hoverSpeed={0} scaleOnHover={true} fadeOut fadeOutColor="#000000" ariaLabel="Technology partners" />
          }
        />

        {/* Projects + Contact — GSAP horizontal scroll with bg reveal */}
        <ProyectosSection
          projects={projects}
          contactSlot={
            <form action={async (formData) => {
              'use server';
              const name = formData.get('name');
              const email = formData.get('email');
              const message = formData.get('message');
              if (name && email && message) {
                console.log('Nuevo mensaje de contacto local:', { name, email, message });
              }
            }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="input-group">
                <label htmlFor="name" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Nombre</label>
                <input type="text" id="name" name="name" required className="form-input" placeholder="Tu nombre" style={{ padding: '0.85rem', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }} />
              </div>
              <div className="input-group">
                <label htmlFor="email" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Correo Electrónico</label>
                <input type="email" id="email" name="email" required className="form-input" placeholder="tu@correo.com" style={{ padding: '0.85rem', fontSize: '0.95rem', backgroundColor: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }} />
              </div>
              <div className="input-group">
                <label htmlFor="message" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Mensaje</label>
                <textarea id="message" name="message" required className="form-input" rows="3" placeholder="Cuéntame sobre tu proyecto..." style={{ padding: '0.85rem', fontSize: '0.95rem', resize: 'vertical', backgroundColor: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}></textarea>
              </div>
              <button type="submit" className="btn-31" style={{ width: '100%', marginTop: '0.25rem' }}>
                <span className="text-container"><span className="text">Enviar Mensaje</span></span>
              </button>
            </form>
          }
        />

        {/* Pinned FAQ + Overlapping Footer */}
        <PinnedFAQFooter
          faqContent={
            <section id="faq" className="container" style={{ paddingBottom: 'var(--spacing-12)', paddingTop: '2rem' }}>
              <FadeInUpScroll style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 6vw, 6rem)', fontWeight: 900, color: 'var(--color-text-main)', letterSpacing: '-0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Preguntas Frecuentes</h2>
              </FadeInUpScroll>
              <FAQAccordion
                faqs={[
                  { q: "¿Estás disponible para trabajo freelance?", a: "Sí, actualmente estoy aceptando nuevos proyectos freelance. Me enfoco en aplicaciones web y desarrollo full stack." },
                  { q: "¿Qué tecnologías sueles usar?", a: "Mi stack principal incluye React y Next.js para el frontend, con Node.js o Python en el backend. Para bases de datos suelo usar PostgreSQL y Firebase." },
                  { q: "¿Trabajas de forma remota?", a: "Absolutamente. Tengo experiencia trabajando con clientes y equipos distribuidos en todo el mundo, manteniendo una comunicación clara y constante." },
                  { q: "¿Cuánto tarda en desarrollarse un sitio web?", a: "El tiempo varía mucho dependiendo de la complejidad y los requerimientos. Una landing page puede tomar un par de semanas, mientras que una aplicación web completa puede llevar meses. Contáctame y hablamos de detalles." }
                ]}
              />
            </section>
          }
          footerContent={
            <footer className="dark-footer" style={{ overflow: 'hidden', backgroundColor: 'transparent', position: 'relative', borderTop: '1px solid #ffffff' }}>
              <style dangerouslySetInnerHTML={{__html: `
                .footer-hover-link {
                  display: inline-block;
                  overflow: hidden;
                  vertical-align: top;
                  font-size: 2rem;
                  font-weight: 900;
                  text-transform: uppercase;
                  color: #fff;
                  text-decoration: none;
                  line-height: 1;
                }
                .footer-hover-link span {
                  display: inline-block;
                  position: relative;
                  transition: transform 0.4s cubic-bezier(0.76, 0, 0.24, 1);
                }
                .footer-hover-link span::after {
                  content: attr(data-text);
                  position: absolute;
                  top: 100%;
                  left: 0;
                  color: rgba(255,255,255,0.6);
                }
                .footer-hover-link:hover span {
                  transform: translateY(-100%);
                }
                .footer-social-btn {
                  border: 1px solid rgba(255,255,255,0.2);
                  border-radius: 50px;
                  width: 45px;
                  height: 45px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  transition: all 0.4s ease;
                  cursor: pointer;
                  position: relative;
                  overflow: hidden;
                  background: transparent;
                  text-decoration: none;
                }
                .footer-social-btn:hover {
                  width: 120px;
                  background: rgba(255,255,255,0.08);
                  border-color: rgba(255,255,255,0.4);
                }
                .footer-social-btn .text {
                  position: absolute;
                  color: #fff;
                  font-weight: 600;
                  font-size: 0.8rem;
                  opacity: 0;
                  transition: opacity 0.4s ease;
                  text-transform: uppercase;
                  letter-spacing: 0.05em;
                }
                .footer-social-btn:hover .text {
                  opacity: 1;
                }
                .footer-social-btn .svgIcon {
                  transition: opacity 0.3s ease;
                  width: 18px;
                  height: 18px;
                  fill: #fff;
                }
                .footer-social-btn:hover .svgIcon {
                  opacity: 0;
                }
              `}} />
              <div className="container" style={{ padding: '2rem 0', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                
                {/* Left Column */}
                <div style={{ flex: '1 1 300px' }}>
                   <FadeInUpScroll delay={0.1}>
                      <h3 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', fontWeight: 900, lineHeight: 1.1, textTransform: 'uppercase', color: '#fff', margin: 0 }}>
                       Start something<br/>
                       <span style={{ color: 'var(--color-text-muted)' }}>Great together</span>
                     </h3>
                   </FadeInUpScroll>
                </div>
      
                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start', flex: '1 1 250px' }}>
                   {/* Navigation List */}
                   <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                     {['Inicio', 'Sobre Mí', 'Proyectos', 'Contacto'].map((item, i) => (
                       <li key={i}>
                         <FadeInUpScroll delay={0.2 + (i * 0.1)}>
                           <a href={i === 0 ? '#' : `#${['about', 'projects', 'contact'][i-1]}`} className="footer-hover-link">
                             <span data-text={item}>{item}</span>
                           </a>
                         </FadeInUpScroll>
                       </li>
                     ))}
                   </ul>
      
                   {/* Follow */}
                   <FadeInUpScroll delay={0.6}>
                     <div>
                       <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>Follow</p>
                       <div className="button-container" style={{ display: 'flex', gap: '0.5rem' }}>
                         <a href="#" className="footer-social-btn">
                           <svg className="svgIcon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                             <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                           </svg>
                           <span className="text">LinkedIn</span>
                         </a>
                         <a href="#" className="footer-social-btn">
                           <svg className="svgIcon" viewBox="0 0 496 512" xmlns="http://www.w3.org/2000/svg">
                             <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                           </svg>
                           <span className="text">GitHub</span>
                         </a>
                         <a href="#" className="footer-social-btn">
                           <svg className="svgIcon" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                             <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                           </svg>
                           <span className="text">Instagram</span>
                         </a>
                       </div>
                     </div>
                   </FadeInUpScroll>
                </div>
              </div>
      
              {/* Big Name */}
              <div style={{ width: '100%', textAlign: 'center', opacity: 0.1, pointerEvents: 'none', userSelect: 'none', marginTop: '6rem' }}>
                 <h1 style={{ fontSize: 'clamp(2rem, 10vw, 12rem)', fontWeight: 900, color: '#fff', whiteSpace: 'nowrap', margin: 0, lineHeight: 1, textTransform: 'uppercase' }}>
                   J
                   <span style={{ WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}>O</span>
                   S
                   <span style={{ WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}>U</span>
                   <span style={{ WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}>É</span>
                   {' '}M
                   <span style={{ WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}>E</span>
                   J
                   <span style={{ WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}>Í</span>
                   A
                 </h1>
              </div>
            </footer>
          }
        />
      </main>
    </>
  );
}

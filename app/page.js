import { supabase } from '../utils/supabase';
import '../components/button.css';
import Navbar from '../components/Navbar';
import HeroProfileCard from '../components/HeroProfileCard';
import FAQAccordion from '../components/FAQAccordion';
import { FadeInLeft, FadeInRight, FadeInDown, FadeInUpScroll, FadeInLeftScroll, FadeInRightScroll } from '../components/HeroAnimations';
import { AnimatedThemeToggler } from '../components/ui/animated-theme-toggler';
import LogoLoop from '../components/LogoLoop';
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
  const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false }).limit(6);
  
  const leftProjects = projects?.filter((_, i) => i % 2 === 0) || [];
  const rightProjects = projects?.filter((_, i) => i % 2 === 1) || [];

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="container animate-fade-up hero-section-padding">
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', lineHeight: 0.9, fontWeight: 900, margin: '0 0 var(--spacing-16) 0', color: 'var(--color-text-main)', letterSpacing: '-0.04em', textTransform: 'uppercase', textAlign: 'inherit' }}>
            Josué Mejía
          </h1>
          
          <div className="hero-grid">
            <FadeInLeft>
              <HeroProfileCard />
            </FadeInLeft>
            
            <FadeInRight className="hero-details">
              <p style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: 'clamp(2rem, 10vw, 6rem)', maxWidth: '400px' }}>
                Fundador de <span style={{ fontWeight: 'bold', color: 'var(--color-text-main)' }}>DE</span><span style={{ fontWeight: 'bold', color: '#4562b7ff' }}>V</span><span style={{ fontWeight: 'bold', color: 'var(--color-text-main)' }}>DN</span>, una empresa especializada en el desarrollo de landing pages, páginas institucionales y e-commerce. 
                <br />
                La creé con el objetivo de ayudar a negocios a construir una presencia digital sólida, moderna y enfocada en resultados.              </p>
              
              <a href="/CV - Josue Mejia.pdf" download="CV - Josue Mejia.pdf" style={{ textDecoration: 'none' }}>
                <button className="btn-31">
                  <span className="text-container">
                    <span className="text">Descargar CV</span>
                  </span>
                </button>
              </a>
            </FadeInRight>
          </div>
        </section>

        {/* Sobre Mi Section */}
        <section id="about" style={{ padding: 'clamp(4rem, 15vw, 6rem) 0' }}>
          <FadeInUpScroll>
            <div className="container" style={{ 
              backgroundColor: '#1a1a1a', 
              borderRadius: 'var(--radius-lg)', 
              padding: 'clamp(4rem, 15vw, 6rem) var(--spacing-6)', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              minHeight: '400px'
            }}>
              <FadeInUpScroll delay={0.2} style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
                <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1 }}>Sobre Mí</h2>
              </FadeInUpScroll>
              
              <FadeInUpScroll delay={0.4} style={{ maxWidth: '800px', textAlign: 'center' }}>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#d1d5db', lineHeight: 1.8 }}>
                  Soy un desarrollador Full Stack apasionado por crear experiencias digitales innovadoras y centradas en el usuario. Me especializo en el desarrollo de aplicaciones web completas, desde la arquitectura del backend hasta la implementación de interfaces modernas, intuitivas y responsivas en el frontend.              
                </p>
              </FadeInUpScroll>
            </div>
          </FadeInUpScroll>
          
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginTop: 'clamp(2rem, 8vw, 4rem)' }}>
            <FadeInUpScroll delay={0.1}>
              <p style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 'var(--spacing-10)' }}>
                Trabajo con tecnologías como <strong style={{ color: 'var(--color-text-main)' }}>React, Next.js y Bootstrap</strong> para la construcción de interfaces dinámicas, y utilizo <strong style={{ color: 'var(--color-text-main)' }}>Node.js, Java, Python</strong> y bases de datos como MySQL o PostgreSQL para el desarrollo del lado del servidor. También tengo experiencia integrando APIs RESTful, sistemas de autenticación (incluyendo Firebase y JWT) y despliegue en plataformas cloud.
              </p>
            </FadeInUpScroll>
            <FadeInUpScroll delay={0.4} style={{ marginTop: 'var(--spacing-12)', height: '200px', position: 'relative', overflow: 'hidden'}}>
              <LogoLoop logos={techLogos} speed={40} direction="left" logoHeight={60} gap={60} hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="#ffffff" ariaLabel="Technology partners" />
              <LogoLoop logos={techLogos} speed={40} direction="right" logoHeight={60} gap={60} hoverSpeed={0} fadeOut fadeOutColor="#ffffff" />
            </FadeInUpScroll>
            <FadeInUpScroll delay={0.2}>
              <p style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', color: 'var(--color-text-muted)', lineHeight: 1.8, marginBottom: 'var(--spacing-10)' }}>
                Me enfoco en escribir código limpio, escalable y mantenible, aplicando buenas prácticas como principios <strong style={{ color: 'var(--color-text-main)' }}>SOLID</strong>, control de versiones con Git y metodologías ágiles. Disfruto transformar ideas en soluciones funcionales que resuelvan problemas reales, optimizando tanto el rendimiento como la experiencia del usuario.
              </p>
            </FadeInUpScroll>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="projects" className="container" style={{ paddingBottom: 'clamp(4rem, 15vw, 6rem)' }}>
          <FadeInUpScroll style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 8vw, 3rem)', marginTop: 'clamp(4rem, 15vw, 6rem)' }}>
            <h2 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', fontWeight: 900, color: 'var(--color-text-main)', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>Trabajos Destacados</h2>
          <FadeInUpScroll delay={0.1}> 
            <p style={{ paddingTop: 'var(--spacing-2)', textAlign: 'center', fontSize: '1.5rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>Una selección de mis proyectos recientes</p>
          </FadeInUpScroll>
          </FadeInUpScroll>
          
          <div className="projects-masonry">
            
            {/* Left Column */}
            <div className="projects-left-col">
              {leftProjects.length > 0 ? leftProjects.map((project, index) => (
                <div key={project.id} className="project-card">
                  <FadeInLeftScroll delay={index * 0.1}>
                    <div className="project-image-wrapper">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="project-image" />
                      ) : (
                        <div style={{ width: '100%', aspectRatio: '2/3', backgroundColor: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Sin Imagen
                        </div>
                      )}
                      {/* Date Badge */}
                      <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#e25e46', color: 'white', padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {new Date(project.created_at).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </FadeInLeftScroll>
                  <FadeInLeftScroll delay={index * 0.1 + 0.1}>
                    <h3 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.75rem' }}>{project.title}</h3>
                  </FadeInLeftScroll>
                  <FadeInLeftScroll delay={index * 0.1 + 0.2}>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {project.description}
                    </p>
                  </FadeInLeftScroll>
                  <FadeInLeftScroll delay={index * 0.1 + 0.3}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                      {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)', textDecoration: 'underline' }}>Ver Demo</a>}
                    </div>
                  </FadeInLeftScroll>
                </div>
              )) : (
                <div style={{ color: 'var(--color-text-muted)' }}>No hay proyectos disponibles.</div>
              )}
            </div>

            {/* Right Column (Staggered) */}
            <div className="projects-right-col">
              {rightProjects.length > 0 ? rightProjects.map((project, index) => (
                <div key={project.id} className="project-card">
                  <FadeInRightScroll delay={index * 0.1 + 0.2}>
                    <div className="project-image-wrapper">
                      {project.image_url ? (
                        <img src={project.image_url} alt={project.title} className="project-image" />
                      ) : (
                        <div style={{ width: '100%', aspectRatio: '4/3', backgroundColor: 'var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          Sin Imagen
                        </div>
                      )}
                      {/* Date Badge */}
                      <div style={{ position: 'absolute', top: 0, right: 0, backgroundColor: '#e25e46', color: 'white', padding: '0.4rem 0.8rem', fontSize: '0.8rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {new Date(project.created_at).toLocaleDateString('es-ES', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </FadeInRightScroll>
                  <FadeInRightScroll delay={index * 0.1 + 0.3}>
                    <h3 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 900, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '0.75rem' }}>{project.title}</h3>
                  </FadeInRightScroll>
                  <FadeInRightScroll delay={index * 0.1 + 0.4}>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                      {project.description}
                    </p>
                  </FadeInRightScroll>
                  <FadeInRightScroll delay={index * 0.1 + 0.5}>
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                      {project.demo_url && <a href={project.demo_url} target="_blank" rel="noreferrer" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-main)', textDecoration: 'underline' }}>Ver Demo</a>}
                    </div>
                  </FadeInRightScroll>
                </div>
              )) : null}
            </div>

          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" style={{ paddingBottom: 'clamp(4rem, 15vw, 6rem)', paddingTop: 'clamp(2rem, 8vw, 3rem)' }}>
          <FadeInUpScroll>
            <div className="container" style={{ 
              backgroundColor: '#1a1a1a', 
              borderRadius: 'var(--radius-lg)', 
              padding: 'clamp(4rem, 15vw, 6rem) var(--spacing-6)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              marginBottom: 'clamp(2rem, 8vw, 3rem)'
            }}>
              <FadeInUpScroll delay={0.2} style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1 }}>Contacto</h2>
                <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: '#d1d5db', marginTop: '1rem' }}>¿Tienes un proyecto en mente? Hablemos.</p>
              </FadeInUpScroll>
            </div>
          </FadeInUpScroll>

          <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <FadeInUpScroll delay={0.2}>
              <form action={async (formData) => {
                'use server';
                const name = formData.get('name');
                const email = formData.get('email');
                const message = formData.get('message');
                
                if(name && email && message) {
                  await supabase.from('contact_messages').insert([{ name, email, message }]);
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="input-group">
                  <label htmlFor="name" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Nombre</label>
                  <input type="text" id="name" name="name" required className="form-input" placeholder="Tu nombre" style={{ padding: '1rem', fontSize: '1rem', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }} />
                </div>
                <div className="input-group">
                  <label htmlFor="email" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Correo Electrónico</label>
                  <input type="email" id="email" name="email" required className="form-input" placeholder="tu@correo.com" style={{ padding: '1rem', fontSize: '1rem', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }} />
                </div>
                <div className="input-group">
                  <label htmlFor="message" style={{ fontWeight: 700, color: 'var(--color-text-main)' }}>Mensaje</label>
                  <textarea id="message" name="message" required className="form-input" rows="5" placeholder="Cuéntame sobre tu proyecto..." style={{ padding: '1rem', fontSize: '1rem', resize: 'vertical', backgroundColor: 'var(--color-surface-hover)', color: 'var(--color-text-main)', border: '1px solid var(--color-border)' }}></textarea>
                </div>
                <button type="submit" className="btn-31" style={{ width: '100%', marginTop: '1rem' }}>
                  <span className="text-container">
                    <span className="text">Enviar Mensaje</span>
                  </span>
                </button>
              </form>
            </FadeInUpScroll>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container" style={{ paddingBottom: 'var(--spacing-12)', paddingTop: 'clamp(2rem, 8vw, 3rem)' }}>
          <FadeInUpScroll style={{ textAlign: 'center', marginBottom: 'var(--spacing-6)' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, color: 'var(--color-text-main)', letterSpacing: '-0.04em', textTransform: 'uppercase' }}>Preguntas Frecuentes</h2>
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
      </main>

      <footer className="dark-footer">
        <div className="container" style={{ position: 'relative', zIndex: 10, marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          
          {/* Left Column: Logo & Copyright */}
          <FadeInUpScroll delay={0.1} className="footer-brand-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: '1 1 300px', alignItems: 'center', textAlign: 'center' }}>
            <FadeInDown delay={0.1} className="boldonse-regular logo-text" style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1 }}>
              <a href="#" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <span style={{ color: '#ffffffff' }}>DE</span><span style={{ color: '#4562b7ff' }}>V</span><span style={{ color: '#ffffffff' }}>DN</span>
              </a>
            </FadeInDown>
            
          </FadeInUpScroll>

          {/* Right Columns Wrapper */}
          <div className="footer-nav-wrapper">
            
            {/* Column 2: Pages */}
            <FadeInUpScroll delay={0.2} style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem 1rem', flex: 1, justifyItems: 'center', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
              <a href="#" className="footer-link-huge">Inicio</a>
              <a href="#about" className="footer-link-huge">Sobre Mí</a>
              <a href="#projects" className="footer-link-huge">Proyectos</a>
              <a href="#contact" className="footer-link-huge">Contacto</a>
            </FadeInUpScroll>
          </div>
        </div>

        <FadeInUpScroll delay={0.5} className="container footer-bottom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p>Copyright &copy; 2026 DEVDN | Desarrollado con pasión</p>
            
            {/* From Uiverse.io by McHaXYT */}
            <div className="button-container">
              <button className="button flex-center">
                <svg viewBox="0 0 24 24" className="btn-svg" width="22px" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g strokeWidth="0"></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g>
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#fff"></path>
                    <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#fff"></path>
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#fff"></path>
                  </g>
                </svg>
              </button>
              <button className="button flex-center">
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" className="btn-svg" width="22px" viewBox="0 -2 20 20">
                  <g strokeWidth="0"></g>
                  <g strokeLinejoin="round" strokeLinecap="round"></g>
                  <g>
                    <g fillRule="evenodd" fill="none" strokeWidth="1">
                      <g fill="#fff" transform="translate(-60.000000, -7521.000000)">
                        <g transform="translate(56.000000, 160.000000)">
                          <path d="M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
              <button className="button flex-center">
                <svg viewBox="0 0 20 20" width="22px" className="btn-svg" xmlns="http://www.w3.org/2000/svg" fill="#fff" stroke="#fff">
                  <g strokeWidth="0"></g>
                  <g strokeLinecap="round" strokeLinejoin="round"></g>
                  <g>
                    <g strokeWidth="1" fill="none" fillRule="evenodd">
                      <g transform="translate(-140.000000, -7559.000000)" fill="#fff">
                        <g transform="translate(56.000000, 160.000000)">
                          <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399"></path>
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </button>
              
            </div>
          </div>
        </FadeInUpScroll>
        
        {/* Massive Background Text Effect */}
        <div style={{ position: 'absolute', bottom: '-4rem', left: '0', width: '100%', pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
          <h1 className="boldonse-regular" style={{ fontSize: '18vw', lineHeight: 0.8, color: 'rgba(255, 255, 255, 0.05)', margin: 0, textAlign: 'center', whiteSpace: 'nowrap', userSelect: 'none' }}>DEVDN</h1>
        </div>
      </footer>
    </>
  );
}


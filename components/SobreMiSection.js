'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeInUpScroll, FadeInLeftScroll, FadeInRightScroll } from './HeroAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function SobreMiSection({ techLogosSlot, buttonsSlot }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const panel1Ref = useRef(null);
  const panel2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const title = titleRef.current;
      const panel2 = panel2Ref.current;

      // Keep "Sobre Mí" pinned while scrolling through section
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        endTrigger: panel2.querySelector('[data-trigger]'),
        end: 'top 300vh', // Unpin when the 'Trabajo...' text reaches just below the title
        pin: title,
        pinSpacing: false,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ position: 'relative', paddingBottom: '0' }}
    >
      {/* Pinned Title Wrapper */}
      <div
        ref={titleRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {/* Inner layout container to protect flexbox from GSAP inline styles */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '17vh',
          paddingRight: '12vw',
        }}>
          <FadeInUpScroll delay={0.2}>
            <h2
              style={{
                fontSize: 'clamp(4rem, 8vw, 7rem)',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.04em',
                textTransform: 'uppercase',
                lineHeight: 1,
                margin: 0,
              }}
            >
              Sobre Mí
            </h2>
          </FadeInUpScroll>
        </div>
      </div>

      {/* Panel 1 - Full Stack description */}
      <div
        ref={panel1Ref}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          padding: 'clamp(6rem, 12vw, 10rem) 0',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', paddingLeft: '38px', paddingRight: '20px' }}>
          <FadeInLeftScroll delay={0.3}>
            <p
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                color: '#e5e7eb',
                lineHeight: 1.65,
                maxWidth: '600px', 
                fontWeight: 400,
                textAlign: 'right', 
                marginRight: 'auto', 
                marginTop: '15vh', 
              }}
            >
              Soy un desarrollador{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Full Stack</span>{' '}
              apasionado por crear experiencias digitales innovadoras y centradas en el
              usuario. Me especializo en el desarrollo de aplicaciones web completas, desde
              la arquitectura del{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>backend</span> hasta la
              implementación de interfaces modernas, intuitivas y responsivas en el{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>frontend</span>.
            </p>
          </FadeInLeftScroll>
        </div>
      </div>

      {/* Panel 2 - Tech stack + buttons */}
      <div
        ref={panel2Ref}
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          padding: 'clamp(6rem, 12vw, 10rem) 0',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div style={{ width: '100%', paddingRight: '12vw', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {/* Text and Buttons Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap-reverse', gap: '2rem' }}>
            
            {/* Buttons (Left side) */}
            <div style={{ flex: 1, display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'auto' }}>
              <a href="/CV - Josue Mejia.pdf" download="CV - Josue Mejia.pdf" style={{ textDecoration: 'none' }}>
                <button className="btn-31" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}>
                  <span className="text-container">
                    <span className="text">Descargar CV</span>
                  </span>
                </button>
              </a>
              <a href="#contact" style={{ textDecoration: 'none' }}>
                <button className="btn-31" style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}>
                  <span className="text-container">
                    <span className="text">Vamos a hablar</span>
                  </span>
                </button>
              </a>
            </div>

            <FadeInRightScroll delay={0.3}>
              <p
                data-trigger
                style={{
                  fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                  color: '#d1d5db',
                  lineHeight: 1.65,
                  maxWidth: '600px', 
                  fontWeight: 400,
                  textAlign: 'left', 
                  margin: 0, 
                }}
              >
                Trabajo con tecnologías como{' '}
                <strong style={{ color: '#ffffff' }}>React, Next.js y Bootstrap</strong> para
                la construcción de interfaces dinámicas, y utilizo{' '}
                <strong style={{ color: '#ffffff' }}>Node.js, Java, Python</strong> y bases de
                datos como{' '}
                <strong style={{ color: '#ffffff' }}>MySQL o PostgreSQL</strong> para el
                desarrollo del lado del servidor. También tengo experiencia integrando{' '}
                <strong style={{ color: '#ffffff' }}>APIs RESTful</strong>, sistemas de
                autenticación (incluyendo{' '}
                <strong style={{ color: '#ffffff' }}>Firebase y JWT</strong>) y despliegue en
                plataformas cloud.
              </p>
            </FadeInRightScroll>
          </div>

          {/* Logo slot */}
          {techLogosSlot && (
            <div style={{ 
              height: '60px', 
              overflow: 'hidden',
              marginLeft: '18px', // Parent paddingLeft is 20px, so 20px + 18px = 38px (approx 1cm) from left edge
              marginRight: 'calc(-12vw + 38px)' // Counteract parent paddingRight (12vw) and set exactly 38px from right edge
            }}>
              {techLogosSlot}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

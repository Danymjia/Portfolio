'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeInUpScroll, FadeInLeftScroll, FadeInRightScroll } from './HeroAnimations';
import Cubes from './Cubes';

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
              Soy un diseñador y desarrollador{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Frontend</span>{' '}
              con sólida experiencia en{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Backend</span>{' '}
              y arquitectura de sistemas web. He desarrollado aplicaciones móviles destacando el uso de{' '}
              <span style={{ color: '#ffffff', fontWeight: 700 }}>Flutter</span>{' '}
              y mi pasión se centra en el diseño, codificación y despliegue de landing pages, sitios web y e-commerce.
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
            
            {/* Interactive Cubes & Buttons (Left side) */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4rem', marginTop: 'auto' }}>
              <div style={{ height: '450px', width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', transform: 'translate(-40px, -60px)' }}>
                <Cubes 
                  gridSize={6}
                  cubeSize={60}
                  maxAngle={45}
                  radius={3}
                  borderStyle="2px dotted rgba(233, 233, 233, 0.4)"
                  faceColor="transparent"
                  rippleColor="#abababff"
                  rippleSpeed={1.5}
                  autoAnimate
                  rippleOnClick
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
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
                Mi enfoque tecnológico principal se basa en{' '}
                <strong style={{ color: '#ffffff' }}>React, Next.js y JavaScript</strong>{' '}
                acompañados de <strong style={{ color: '#ffffff' }}>Supabase</strong>{' '}
                para crear soluciones integrales. Además, cuento con bases sólidas en{' '}
                <strong style={{ color: '#ffffff' }}>Python y Java</strong>{' '}
                y experiencia trabajando con bases de datos como{' '}
                <strong style={{ color: '#ffffff' }}>MongoDB, MySQL, SQL Server y PostgreSQL</strong>. También poseo conocimientos prácticos en redes y soporte a usuarios.
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

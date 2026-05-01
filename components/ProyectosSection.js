'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FadeInUpScroll } from './HeroAnimations';

gsap.registerPlugin(ScrollTrigger);

export default function ProyectosSection({ projects = [], contactSlot }) {
  const wrapperRef      = useRef(null);
  const cardsViewportRef = useRef(null);
  const trackRef        = useRef(null);
  const contactBgRef    = useRef(null); // background image overlay

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardsViewport = cardsViewportRef.current;
      const track         = trackRef.current;
      const contactBg     = contactBgRef.current;
      if (!track || !cardsViewport) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

      // Timeline fractions (must sum to 1)
      const PAUSE         = 0.04; // tiny initial pause when cards appear
      const SCROLL        = 0.40; // horizontal scroll through all cards to contact
      const CONTACT_PAUSE = 0.08; // ~1s pause: contact centered, NO background yet
      const BG_REVEAL     = 0.33; // ~3s slow background reveal
      const HOLD          = 0.15; // noticeable pause with full bg visible
      const EXIT          = 0.03; // slide left

      // Total scroll length in px — horizontal movement only takes SCROLL fraction
      const totalScrollLength = (track.scrollWidth - window.innerWidth) / SCROLL;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsViewport,
          start: 'top top',
          end: () => `+=${totalScrollLength}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to({}, { duration: PAUSE })
        .to(track, { x: getScrollAmount, ease: 'none', duration: SCROLL })   // cards scroll to contact
        .to({}, { duration: CONTACT_PAUSE })                                  // long pause — contact visible, black bg
        .to(contactBg, { opacity: 1, ease: 'none', duration: BG_REVEAL })    // slow bg reveal
        .to({}, { duration: HOLD })                                            // brief pause with full bg
        .to(cardsViewport, { x: '-100vw', ease: 'power2.inOut', duration: EXIT }); // exit left

    }, wrapperRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={wrapperRef} id="projects" style={{ position: 'relative', zIndex: 2, backgroundColor: '#0a0a0a', overflow: 'hidden' }}>

      {/* Title — normal vertical scroll */}
      <div style={{ width: '100%', padding: 'clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem)', paddingLeft: 'clamp(1.5rem, 5vw, 5rem)' }}>
        <h2 style={{ fontSize: 'clamp(4rem, 9vw, 8rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1.3, margin: 0 }}>
          <FadeInUpScroll delay={0.1} style={{ display: 'block' }}>
            Proyectos
          </FadeInUpScroll>
          <FadeInUpScroll delay={0.3} style={{ display: 'block' }}>
            Destacados
          </FadeInUpScroll>
        </h2>
      </div>

      {/* Cards viewport — pinned, scrolls horizontally */}
      <div ref={cardsViewportRef} style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
        <div ref={trackRef} style={{ display: 'flex', alignItems: 'center', height: '100%', width: 'max-content' }}>

          {/* Initial left offset */}
          <div style={{ flexShrink: 0, width: 'clamp(1.5rem, 5vw, 5rem)' }} />

          {/* Project cards */}
          {projects.map((project, i) => (
            <div key={project.id} style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '2.5vw', marginRight: '7vw', height: '100%', padding: '5vh 0' }}>
              {/* White card */}
              <div
                style={{ width: 'min(460px, 40vw)', height: '100%', maxHeight: '78vh', backgroundColor: '#ffffff', borderRadius: '2px', overflow: 'hidden', display: 'flex', flexDirection: 'column', flexShrink: 0, cursor: 'pointer', boxShadow: '0 30px 80px rgba(0,0,0,0.5)', transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.4s ease' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-16px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 50px 120px rgba(0,0,0,0.8)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,0,0,0.5)'; }}
              >
                <div style={{ flex: '1 1 65%', backgroundColor: '#e8e8e8', position: 'relative', overflow: 'hidden' }}>
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.08)', fontSize: 'clamp(5rem, 14vw, 10rem)', fontWeight: 900, letterSpacing: '-0.07em' }}>
                      {String(i + 1).padStart(2, '00')}
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(0,0,0,0.3)', textTransform: 'uppercase' }}>
                    {String(i + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                  </div>
                </div>
                <div style={{ padding: '1.5rem 1.75rem 2rem', flex: '0 0 auto', backgroundColor: '#ffffff' }}>
                  <h3 style={{ fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)', fontWeight: 900, color: '#0a0a0a', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: '0.8rem' }}>{project.title}</h3>
                  <p style={{ fontSize: '0.82rem', color: 'rgba(0,0,0,0.45)', lineHeight: 1.5, marginBottom: '1.1rem' }}>{project.description}</p>
                  {project.demo_url && (
                    <a href={project.demo_url} target="_blank" rel="noreferrer" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0a0a0a', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', borderBottom: '1px solid rgba(0,0,0,0.25)', paddingBottom: '2px' }}>Ver Demo →</a>
                  )}
                </div>
              </div>

              {/* Side info */}
              <div style={{ maxWidth: '280px', flexShrink: 0 }}>
                <p style={{ fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '0.75rem', fontWeight: 600 }}>Proyecto {String(i + 1).padStart(2, '0')}</p>
                <h3 style={{ fontSize: 'clamp(1.9rem, 2.8vw, 2.8rem)', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.3, marginBottom: '0.9rem' }}>{project.title}</h3>
                <p style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: '1.75rem' }}>{project.description}</p>
                {project.demo_url && (
                  <a href={project.demo_url} target="_blank" rel="noreferrer"
                    style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, color: '#fff', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.65rem 1.4rem', border: '1px solid rgba(255,255,255,0.18)', transition: 'background 0.2s, border-color 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                  >Ver Demo →</a>
                )}
              </div>
            </div>
          ))}

          {/* ── CONTACT PANEL — last horizontal slide with background reveal ── */}
          <div style={{ flexShrink: 0, width: '100vw', height: '100%', position: 'relative', overflow: 'hidden' }}>

            {/* Background image — fades in via GSAP */}
            <div
              ref={contactBgRef}
              style={{
                position: 'absolute', inset: 0,
                backgroundImage: 'url(/contacto_bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0, // starts invisible
              }}
            />
            {/* Overlay — lighter so the image shows through */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.15) 100%)' }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 6vw' }}>
              <div id="contact" style={{ width: '100%', maxWidth: '560px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 1, margin: 0 }}>Contacto</h2>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', color: 'rgba(255,255,255,0.5)', margin: 0 }}>¿Tienes un proyecto en mente? Hablemos.</p>
                {contactSlot}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

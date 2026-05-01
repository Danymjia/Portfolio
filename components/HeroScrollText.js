'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

/**
 * Fixed-position clone rendered via portal on document.body.
 * This avoids overflow:hidden / transform context issues from parent containers.
 */
function FixedNavName({ innerRef }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <h1
      ref={innerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: '22px',
        left: '24px',
        fontSize: '18px',
        lineHeight: 1.2,
        fontWeight: 900,
        color: 'var(--color-text-main)',
        letterSpacing: '-0.04em',
        textTransform: 'uppercase',
        textAlign: 'left',
        margin: 0,
        zIndex: 51,
        opacity: 0,
        visibility: 'hidden',
        pointerEvents: 'none',
        fontFamily: 'var(--font-heading)',
      }}
    >
      Josué Mejía
    </h1>,
    document.body
  );
}

/**
 * Hero heading that animates from a large centered position
 * to a small fixed navbar-logo position on scroll.
 * 
 * Uses GSAP ScrollTrigger with Lenis smooth scroll.
 * transformOrigin 'left top' makes the text visually shrink from right to left.
 */
export default function HeroScrollText() {
  const textRef = useRef(null);
  const wrapperRef = useRef(null);
  const fixedRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;

    // Delay to ensure fonts are loaded, layout is settled,
    // and SmoothScroll (parent) has connected Lenis to ScrollTrigger
    const initTimeout = setTimeout(() => {
      const fixed = fixedRef.current;

      // Hide fixed clone initially
      if (fixed) {
        gsap.set(fixed, { autoAlpha: 0 });
      }

      // Measure starting position/size
      const startRect = el.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const startFontSize = parseFloat(getComputedStyle(el).fontSize);

      // Target: small text in the navbar (top-left)
      const targetFontSize = 18;
      const targetViewportTop = 22;
      const targetViewportLeft = 24;

      // Scale ratio — how much to shrink
      const scaleRatio = targetFontSize / startFontSize;

      // Transform origin left-top: text shrinks from right to left visually
      gsap.set(el, { transformOrigin: 'left top' });

      // Compute absolute positions for delta calculation
      const elAbsoluteTop = startRect.top + scrollTop;
      const elAbsoluteLeft = startRect.left;

      // Compute scroll position at animation end
      const wrapperRect = wrapper.getBoundingClientRect();
      const wrapperAbsoluteBottom = wrapperRect.bottom + scrollTop;
      const windowHeight = window.innerHeight;
      const scrollAtEnd = wrapperAbsoluteBottom - 0.2 * windowHeight;

      // Calculate translation so text lands at target viewport position when animation ends
      const deltaY = targetViewportTop - elAbsoluteTop + scrollAtEnd;
      const deltaX = targetViewportLeft - elAbsoluteLeft;

      // Main animation: scrubbed by scroll progress
      gsap.to(el, {
        scale: scaleRatio,
        x: deltaX,
        y: deltaY,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'bottom 90%',
          end: 'bottom 20%',
          scrub: 0.5,
        },
      });

      // At animation end, swap to the fixed clone for true fixed positioning
      if (fixed) {
        ScrollTrigger.create({
          trigger: wrapper,
          start: 'bottom 20%',
          onEnter: () => {
            gsap.set(el, { autoAlpha: 0 });
            gsap.set(fixed, { autoAlpha: 1 });
          },
          onLeaveBack: () => {
            gsap.set(el, { autoAlpha: 1 });
            gsap.set(fixed, { autoAlpha: 0 });
          },
        });
      }
    }, 500);

    return () => {
      clearTimeout(initTimeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <FixedNavName innerRef={fixedRef} />

      <style>{`
        @keyframes subtleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(15px); }
        }
      `}</style>
      <div ref={wrapperRef} style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
          <h1
            ref={textRef}
            style={{
              fontSize: 'clamp(3.5rem, 12vw, 10rem)',
              lineHeight: 0.9,
              fontWeight: 900,
              color: 'var(--color-text-main)',
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              textAlign: 'center',
              margin: 0,
              willChange: 'transform',
              zIndex: 51,
            }}
          >
            Josué Mejía
          </h1>
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="var(--color-text-muted, #9ca3af)" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ 
              position: 'absolute',
              left: '100%',
              marginLeft: '4.5rem',
              marginTop: '6rem',
              animation: 'subtleBounce 2s infinite ease-in-out'
            }}
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </>
  );
}

'use client';

import { useState, useEffect } from 'react';

import { FadeInDown } from './HeroAnimations';
import { Menu, X } from 'lucide-react';
import './button.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparecer el desvanecido después de hacer scroll (ajusta el 100 según el timing exacto que busques)
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, width: '100%', zIndex: 50, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '1.5rem 3rem 2rem 1.5rem', pointerEvents: 'none' }}>
      {/* Fondo con desvanecido y transición suave */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0) 100%)',
        opacity: isScrolled ? 1 : 0,
        transition: 'opacity 1s ease-in-out',
        zIndex: -1,
      }} />
      {/* Mobile Hamburger Button */}
      <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: 'auto', pointerEvents: 'auto' }}>
        <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)', padding: '0.5rem' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>



      {/* Desktop Navigation & Actions */}
      <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2rem', pointerEvents: 'auto' }}>
        <nav className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
          <FadeInDown delay={0.2}><a href="#" style={{ color: 'var(--color-text-main)', fontSize: '0.85rem' }}>INICIO</a></FadeInDown>
          <FadeInDown delay={0.3}><a href="#about" style={{ color: 'var(--color-text-main)', fontSize: '0.85rem' }}>SOBRE MI</a></FadeInDown>
          <FadeInDown delay={0.4}><a href="#projects" className="has-dropdown" style={{ color: 'var(--color-text-main)', fontSize: '0.85rem' }}>PROYECTOS</a></FadeInDown>
          <FadeInDown delay={0.5}><a href="#contact" style={{ color: 'var(--color-text-main)', fontSize: '0.85rem' }}>CONTACTO</a></FadeInDown>
        </nav>

      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-menu-dropdown" style={{ padding: '1rem' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', margin: '1rem 0' }}>
            <a href="#" onClick={toggleMenu} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>INICIO</a>
            <a href="#about" onClick={toggleMenu} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>SOBRE MI</a>
            <a href="#projects" onClick={toggleMenu} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>PROYECTOS</a>
            <a href="#contact" onClick={toggleMenu} style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>CONTACTO</a>
          </nav>
        </div>
      )}
    </header>
  );
}

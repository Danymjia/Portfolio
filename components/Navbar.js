'use client';

import { useState } from 'react';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { FadeInDown } from './HeroAnimations';
import { Menu, X } from 'lucide-react';
import './button.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="container main-nav-header" style={{ position: 'relative', zIndex: 50 }}>
      {/* Mobile Hamburger Button */}
      <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)', padding: '0.5rem' }}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Logo */}
      <FadeInDown delay={0.1} className="boldonse-regular logo-text">
        DE<span style={{ color: '#4562b7ff' }}>V</span>DN
      </FadeInDown>

      {/* Mobile Actions Overlay/Theme Toggler */}
      <div className="mobile-only" style={{ display: 'flex', alignItems: 'center' }}>
        <AnimatedThemeToggler />
      </div>

      {/* Desktop Navigation */}
      <nav className="nav-links desktop-only">
        <FadeInDown delay={0.2}><a href="#" style={{ color: 'var(--color-text-main)' }}>INICIO</a></FadeInDown>
        <FadeInDown delay={0.3}><a href="#about" style={{ color: 'var(--color-text-main)' }}>SOBRE MI</a></FadeInDown>
        <FadeInDown delay={0.4}><a href="#projects" className="has-dropdown" style={{ color: 'var(--color-text-main)' }}>PROYECTOS</a></FadeInDown>
        <FadeInDown delay={0.5}><a href="#contact" style={{ color: 'var(--color-text-main)' }}>CONTACTO</a></FadeInDown>
      </nav>

      {/* Desktop Actions */}
      <FadeInDown delay={0.6} className="desktop-only">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <AnimatedThemeToggler />
          <a href="#contact" style={{ textDecoration: 'none' }}>
            <button className="btn-31">
              <span className="text-container">
                <span className="text">Vamos a hablar</span>
              </span>
            </button>
          </a>
        </div>
      </FadeInDown>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-menu-dropdown">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center', margin: '2rem 0' }}>
            <a href="#" onClick={toggleMenu} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>INICIO</a>
            <a href="#about" onClick={toggleMenu} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>SOBRE MI</a>
            <a href="#projects" onClick={toggleMenu} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>PROYECTOS</a>
            <a href="#contact" onClick={toggleMenu} style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text-main)', textDecoration: 'none' }}>CONTACTO</a>
          </nav>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
             <a href="#contact" onClick={toggleMenu} style={{ textDecoration: 'none' }}>
              <button className="btn-31" style={{ scale: '0.9' }}>
                <span className="text-container">
                  <span className="text">Vamos a hablar</span>
                </span>
              </button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

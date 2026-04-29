'use client';

import { useState } from 'react';

import { FadeInDown } from './HeroAnimations';
import { Menu, X } from 'lucide-react';
import './button.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="container" style={{ position: 'fixed', top: 0, left: 0, right: 0, margin: '0 auto', zIndex: 50, backgroundColor: 'transparent', backdropFilter: 'none', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '2rem 1.5rem 1rem 1.5rem' }}>
      {/* Mobile Hamburger Button */}
      <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginRight: 'auto' }}>
        <button onClick={toggleMenu} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-main)', padding: '0.5rem' }}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>



      {/* Desktop Navigation & Actions */}
      <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
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

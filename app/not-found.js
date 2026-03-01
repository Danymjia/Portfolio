'use client';

import './globals.css';
import '../components/button.css';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-text-main)',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div style={{
        fontSize: 'clamp(10rem, 30vw, 20rem)',
        fontWeight: 900,
        lineHeight: 0.8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        letterSpacing: '-0.05em'
      }}>
        <span style={{ color: 'var(--color-text-main)' }}>404</span>
        
      </div>
      
      <h1 className="boldonse-regular" style={{
        fontSize: 'clamp(3rem, 10vw, 6rem)',
        marginTop: '0.5rem',
        marginBottom: '4rem',
        letterSpacing: '-0.02em',
        color: 'var(--color-text-main)',
        textTransform: 'capitalize'
      }}>
        Page Not Found
      </h1>
      
      <div style={{ paddingTop: 'var(--spacing-4)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <a href="/" style={{ textDecoration: 'none' }}>
          <button className="btn-31">
            <span className="text-container">
              <span className="text">Volver al inicio</span>
            </span>
          </button>
        </a>
      </div>
    </div>
  );
}

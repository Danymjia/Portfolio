'use client';

export default function PinnedFAQFooter({ faqContent, footerContent }) {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        backgroundColor: 'transparent',
        marginTop: 'clamp(-8rem, -14vw, -3.5rem)',
      }}
    >
      {/* FAQ goes in the background layer, using sticky to stay on screen */}
      <div 
        style={{ 
          position: 'sticky', 
          top: 'calc(80px - 2rem)', // Ajustado para que el título toque exactamente el navbar (compensando el paddingTop de 2rem)
          zIndex: 1, 
          width: '100%'
        }}
      >
        {faqContent}
      </div>
      
      {/* Spacer outside the sticky element, inside the parent container.
          This adds physical scrollable height to the parent, 
          creating the "hold" where the FAQ stays pinned before the footer arrives. */}
      <div style={{ height: '50vh', width: '100%', pointerEvents: 'none' }} />

      {/* Footer scrolls over the sticky FAQ, needs higher z-index and solid background */}
      <div 
        style={{ 
          position: 'relative', 
          zIndex: 2, 
          backgroundColor: '#0a0a0a', 
          width: '100%', 
          boxShadow: '0 -20px 40px rgba(0,0,0,0.8)' 
        }}
      >
        {footerContent}
      </div>
    </div>
  );
}

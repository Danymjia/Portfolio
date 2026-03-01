'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQItem({ faq, isOpen, onClick }) {

  return (
    <div style={{ backgroundColor: 'var(--color-surface-hover)', borderRadius: 'var(--radius-md)', padding: '1.5rem', overflow: 'hidden' }}>
      <button 
        onClick={onClick}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-main)' }}>{faq.q}</span>
        <motion.span 
          animate={{ rotate: isOpen ? 45 : 0 }} 
          transition={{ duration: 0.3 }}
          style={{ fontSize: '1.5rem', color: 'var(--color-text-main)', display: 'inline-block' }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

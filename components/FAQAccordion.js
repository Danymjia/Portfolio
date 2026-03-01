'use client';

import React, { useState } from 'react';
import FAQItem from './FAQItem';
import { FadeInUpScroll } from './HeroAnimations';

export default function FAQAccordion({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: '500px' }}>
      {faqs.map((faq, index) => (
        <FadeInUpScroll key={index} delay={0.1 * index}>
          <FAQItem 
            faq={faq} 
            isOpen={activeIndex === index} 
            onClick={() => handleToggle(index)} 
          />
        </FadeInUpScroll>
      ))}
    </div>
  );
}

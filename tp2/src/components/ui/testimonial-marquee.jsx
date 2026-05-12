import React from 'react';
import './testimonial-marquee.css';

export function TestimonialMarquee({ items, speed = "slow", direction = "left", className = "" }) {
  // Duplicamos los items varias veces para que el scroll infinito se vea fluido, incluso con solo 3 tips
  const multipliedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`marquee-container ${className}`}>
      <div className={`marquee-content scroll-${direction} speed-${speed}`}>
        {multipliedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="marquee-item">
            <span className="marquee-rank">#{item.originalIndex + 1}</span>
            <p className="marquee-text">{item.text}</p>
            <span className="marquee-votes">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '4px', verticalAlign: '-2px'}}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              {item.votes}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StackedTestimonialMarquee({ items }) {
  if (!items || items.length === 0) return null;
  
  return (
    <div className="stacked-marquee-wrapper">
      <TestimonialMarquee items={items} direction="left" speed="normal" />
      {/* La segunda fila invierte el orden y se mueve hacia la derecha para el efecto stacked */}
      <TestimonialMarquee items={[...items].reverse()} direction="right" speed="slow" />
    </div>
  );
}

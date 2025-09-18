// src/components/TimelessCare.js

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { expertiseData } from '../../api/expertiseData';
import './TimelessCare.scss';

gsap.registerPlugin(ScrollTrigger);

const TimelessCare = () => {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollSection = scrollRef.current;
    const totalWidth = scrollSection.scrollWidth - window.innerWidth;

    gsap.to(scrollSection, {
      x: -totalWidth,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      }
    });

    // Clean up on unmount
    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="expertise-container">
      <div ref={scrollRef} className="expertise-scroll">
        {expertiseData.map((item, index) => (
          <div key={index} className="expertise-item">
            <img src={item.image} alt={item.alt} className="expertise-icon" />
            <h3 className="expertise-title">{item.title}</h3>
            <p className="expertise-text">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TimelessCare;

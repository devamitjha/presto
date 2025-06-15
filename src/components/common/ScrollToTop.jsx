import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react'; // Optional: install lucide-react or replace with ↑ icon
import './ScrollToTop.scss'; // Add styles here

const ScrollToTop = () => {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    setShow(window.scrollY > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return show ? (
    <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
      <ChevronUp size={20} />
    </button>
  ) : null;
};

export default ScrollToTop;

import React, { useState, useRef } from 'react';
import './RippleEffect.css';

const RippleEffect = ({ children, className = '', ...rest }) => {
  const [ripples, setRipples] = useState([]);
  const rippleContainer = useRef(null);

  const createRipple = (event) => {
    const container = rippleContainer.current;
    const rect = container.getBoundingClientRect();

    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
    };

    setRipples((prevRipples) => [...prevRipples, newRipple]);

    setTimeout(() => {
      setRipples((prevRipples) => prevRipples.slice(1));
    }, 600);
  };

  return (
    <div
      className={`ripple-wrapper ${className}`}
      onClick={createRipple}
      ref={rippleContainer}
      {...rest}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </div>
  );
};

export default RippleEffect;

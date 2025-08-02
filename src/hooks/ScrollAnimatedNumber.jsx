// components/common/ScrollAnimatedNumber.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import NumberFlow, { continuous } from '@number-flow/react';

const ScrollAnimatedNumber = ({ value, format, ...rest }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [triggerValue, setTriggerValue] = useState(0);

  // When in view, trigger animation by updating triggerValue
  useEffect(() => {
    if (inView && triggerValue !== value) {
      setTriggerValue(value);
    }
  }, [inView, value, triggerValue]);

  return (
    <span ref={ref}>
      <NumberFlow value={triggerValue} plugins={[continuous]} format={format} {...rest} />
    </span>
  );
};

export default ScrollAnimatedNumber;

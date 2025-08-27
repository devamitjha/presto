import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 100 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.6 } },
};

const StaggerOnView = ({ children, className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20% 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'show' : 'hidden'}
    >
      {React.Children.map(children, (child) =>
        <motion.div variants={itemVariants} className="animated-item col-12 col-lg-6">{child}</motion.div>
      )}
    </motion.div>
  );
};

export default StaggerOnView;

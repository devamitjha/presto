// components/Card.jsx
import { motion } from 'framer-motion';
import React from 'react';

const Card = ({ item, onClick }) => {
  return (
    <motion.div
      layoutId={`card-container-${item.id}`}
      className="card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
        
        <img src={item.img} alt={item.title}/> 
        <motion.h3 layoutId={`card-title-${item.id}`}>{item.title}</motion.h3>
    </motion.div>
  );
};

export default Card;

// components/Card.jsx
import { Image } from '@imagekit/react';
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
        <Image
            urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/spotlight/"
            src={item.img}
            alt={item.title}
        />
        <motion.div className="card-title">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.div>
    </motion.div>
  );
};

export default Card;

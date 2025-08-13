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
            urlEndpoint="https://ik.imagekit.io/pressto/images/spotlight/"
            src={item.img}
            alt={item.title}
        />
        <motion.h3 layoutId={`card-title-${item.id}`}>{item.title}</motion.h3>
    </motion.div>
  );
};

export default Card;

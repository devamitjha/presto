// components/Card.jsx
import { Image } from '@imagekit/react';
import { motion } from 'framer-motion';
import { Radius } from 'lucide-react';
import React from 'react';

const Card = ({ item, onClick }) => {
  return (
    <motion.div
      layoutId={`card-container-${item.id}`}
      className="card"
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <div style={{position:'relative'}}>
        <Image
            urlEndpoint="https://www.presstoindia.com/media/spotlight/"
            src={item.img}
            alt={item.title}
        />
        <div style={{
          width: "150px",
          height: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: "50%",
          bottom: "20px",
          transform: "translateX(-50%)",
          cursor: "pointer",
          borderRadius:'99999px',
          border:"1px solid #333",
          backgroundColor:'white',
          zIndex:2
        }}>Know More</div>
      </div>
        <motion.div className="card-title">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.div>
    </motion.div>
  );
};

export default Card;

// components/Modal.jsx
import { Image } from '@imagekit/react';
import { motion } from 'framer-motion';
import React from 'react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const Modal = ({ item, onClose }) => {
  return (
    <motion.div
      className="backdrop"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        layoutId={`card-container-${item.id}`}
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
            urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/spotlight/"
            src={item.img}
            alt={item.title}
        />
        <motion.h3 layoutId={`card-title-${item.id}`}>{item.title}</motion.h3>
        <p>{item.description}</p>
      </motion.div>
    </motion.div>
  );
};

export default Modal;

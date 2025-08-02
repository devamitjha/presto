import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Card from './Card';
import Modal from './Modal';
import "./motionCard.scss";


const AnimatedCard = ({spolightItem}) => {
    const [selectedId, setSelectedId] = useState(null);

    return (
      <LayoutGroup>
        <div className="grid">
          {spolightItem.map((item) => (
            <Card key={item.id} item={item} onClick={() => setSelectedId(item)} />
          ))}
        </div>
  
        <AnimatePresence>
          {selectedId && (
            <Modal
              item={selectedId}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
    );
}

export default AnimatedCard

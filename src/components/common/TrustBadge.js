import React from 'react';
import { useDispatch } from "react-redux";
import './TrustBadge.scss';
import { openSheet } from '../../redux/slices/sideSheetSlice';

const avatars = [
  'https://randomuser.me/api/portraits/men/11.jpg',
  'https://randomuser.me/api/portraits/women/12.jpg',
  'https://randomuser.me/api/portraits/men/13.jpg',
];

const TrustBadge = () => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    //document.body.style.overflow = "hidden";
    dispatch(openSheet());
  };
  return (
    <div className="trust-badge" onClick={handleOpen}>
      <div className="avatar-group">
        {avatars.map((src, index) => (
          <img src={src} alt={`user-${index}`} key={index} className="avatar" />
        ))}
        <div className="more-count">+32</div>
      </div>
      <p className="trust-text">Discover stories of trust</p>
    </div>
  );
};

export default TrustBadge;

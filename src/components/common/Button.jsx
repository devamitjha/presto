import React from 'react';
import RippleEffect from "./RippleEffect"


export const Button = ({ title, className }) => {
  return (
    <RippleEffect className={className}>
      {title}
    </RippleEffect>
  );
};

export const ButtonWithIcon = ({ title, icon, className }) => {
  return (    
    <RippleEffect className={className}>
        {title}
        <span className="icon-box">
          {icon}
        </span>
    </RippleEffect>
  );
};
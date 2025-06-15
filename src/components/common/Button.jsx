import React from 'react';
import RippleEffect from "./RippleEffect"


export const Button = ({ title, className, GoTo }) => {
  return (
    <RippleEffect className={className} onClick={GoTo}>
      {title}
    </RippleEffect>
  );
};

export const ButtonWithIcon = ({ title, icon, className, GoTo }) => {
  return (    
    <RippleEffect className={className} onClick={GoTo}>
        {title}
        <span className="icon-box">
          {icon}
        </span>
    </RippleEffect>
  );
};
// components/BeforeAfterSlider.jsx
import React from 'react';
import CompareImage from 'react-compare-image';
import './BeforeAfterSlider.scss'; // optional custom styling

const BeforeAfterSlider = ({ beforeImage, afterImage, label }) => {
  return (
    <div className="before-after-wrapper">
      <CompareImage
        leftImage={beforeImage}
        rightImage={afterImage}
        sliderPositionPercentage={0.5}
        alt="Before and After Comparison"
      />
    </div>
  );
};

export default BeforeAfterSlider;

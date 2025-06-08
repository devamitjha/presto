import React from 'react';
import Slider from 'react-slick';
import './RealSlider.scss';

import Rel1 from '../assets/images/rel-1.jpg';
import Rel2 from '../assets/images/rel-2.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ChevronRight, ChevronLeft } from 'lucide-react';

// Custom Arrow Components
const NextArrow = ({ onClick }) => (
  <div className="nextArrow" onClick={onClick}>
    <ChevronRight />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="prevArrow" onClick={onClick}>
    <ChevronLeft />
  </div>
);

const RealSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true
  };

  return (
    <div className="realSlider">
      <Slider {...settings}>
        {[Rel1, Rel2].map((img, index) => (
          <div className="slider-item" key={index}>
            <img src={img} alt={`Real Story Slide ${index + 1}`} loading="lazy" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RealSlider;

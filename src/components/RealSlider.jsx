import React from 'react';
import Slider from 'react-slick';
import './RealSlider.scss';

import Gabriella from '../assets/video/Gabriella.mp4';
import NandiniBhalla from '../assets/video/Nandini-Bhalla.mp4';
import RinaDhaka from '../assets/video/Rina-Dhaka.mp4';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ChevronRight, ChevronLeft } from 'lucide-react';

const mediaItems = [
  { type: 'video', src: Gabriella },
  { type: 'video', src: NandiniBhalla },
  { type: 'video', src: RinaDhaka }
];

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
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    swipe: true,
    autoplay: false,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: true
  };

  return (
    <div className="realSlider">
      <Slider {...settings}>
        {mediaItems.map((item, index) => (
          <div className="slider-item" key={index}>
            <video
              src={item.src}
              controls
              autoPlay
              muted
              loop
              playsInline
              style={{ width: '100%', height: '500px' }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RealSlider;

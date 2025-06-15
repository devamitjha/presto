import React from 'react';
import Slider from 'react-slick';
import CompareImage from 'react-compare-image';
import { ChevronRight, ChevronLeft } from 'lucide-react';


import Before1 from '../assets/images/service/before.jpg';
import After1 from '../assets/images/service/after.jpg';

import Before2 from '../assets/images/service/before.jpg';
import After2 from '../assets/images/service/after.jpg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BeforeAfterSliderCarousel.scss';

function NavNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navNext"
      onClick={onClick}
    > <ChevronRight /></div>
  );
}

function NavPrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navPrev"
      onClick={onClick}
    ><ChevronLeft /></div>
  );
}

const slides = [
  { before: Before1, after: After1 },
  { before: Before2, after: After2 },
];

const BeforeAfterSliderCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    swipe: false,
      touchMove: false,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />,
  };

  return (
    <div className="before-after-carousel">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div className="slider-item" key={index}>
            <CompareImage
              leftImage={slide.before}
              rightImage={slide.after}
              alt="Before vs After"
              sliderPositionPercentage={0.5}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BeforeAfterSliderCarousel;

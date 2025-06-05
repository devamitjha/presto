import React from 'react';
import Slider from 'react-slick';
import { MoveRight, MoveLeft } from 'lucide-react';
import './HeroSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Image1 from '../assets/images/banner-1.jpg';
import Image2 from '../assets/images/banner-1.jpg';
import Image3 from '../assets/images/banner-1.jpg';

function NavNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navNext"
      onClick={onClick}
    > <MoveRight /></div>
  );
}

function NavPrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navPrev"
      onClick={onClick}
    ><MoveLeft /></div>
  );
}

const HeroSlider = () => {
  const images = [
    { src: Image1, alt: 'Modern Gold Necklace Design' },
    { src: Image2, alt: 'Elegant Diamond Rings' },
    { src: Image3, alt: 'New Arrival Bridal Set' }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div className="slider-item" key={index}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;

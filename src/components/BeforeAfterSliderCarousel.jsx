import React from 'react';
import Slider from 'react-slick';
import { ChevronRight, ChevronLeft } from 'lucide-react';
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



const BeforeAfterSliderCarousel = ({imageData}) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //draggable: false,
    //swipe: false,
    //touchMove: false,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />,
  };

  return (
    <div className="before-after-carousel">
      <Slider {...settings}>
        {imageData.map((item, index) => (
          <div className="slider-item" key={index}>
            <img src={item.image} width="580px" height="400px" alt={item.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BeforeAfterSliderCarousel;

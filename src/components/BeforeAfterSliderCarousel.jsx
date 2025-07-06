import React from 'react';
import Slider from 'react-slick';
import CompareImage from 'react-compare-image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BeforeAfterSliderCarousel.scss';

//cleaning
import Cleaning1 from "../assets/images/beforeAfter/cleaning/1.jpg";
import Cleaning2 from "../assets/images/beforeAfter/cleaning/2.jpg";
import Cleaning3 from "../assets/images/beforeAfter/cleaning/3.jpg";
import Cleaning4 from "../assets/images/beforeAfter/cleaning/4.jpg";
import Cleaning5 from "../assets/images/beforeAfter/cleaning/5.jpg";
import Cleaning6 from "../assets/images/beforeAfter/cleaning/6.jpg";
import Cleaning7 from "../assets/images/beforeAfter/cleaning/7.jpg";
import Cleaning8 from "../assets/images/beforeAfter/cleaning/8.jpg";

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

const sliderData = [
  {image: Cleaning1, title: "Cleaning 1"},
  {image: Cleaning2, title: "Cleaning 2"},
  {image: Cleaning3, title: "Cleaning 3"},
  {image: Cleaning4, title: "Cleaning 4"},
  {image: Cleaning5, title: "Cleaning 5"},
  {image: Cleaning6, title: "Cleaning 6"},
  {image: Cleaning7, title: "Cleaning 7"},
  {image: Cleaning8, title: "Cleaning 8"},
];

const BeforeAfterSliderCarousel = () => {
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
        {sliderData.map((item, index) => (
          <div className="slider-item" key={index}>
            <img src={item.image} width="580px" height="400px" alt={item.alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BeforeAfterSliderCarousel;

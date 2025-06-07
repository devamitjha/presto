import React from 'react'
import Slider from "react-slick";
import "./RealSlider.scss";
import Rel1 from "../assets/images/rel-1.jpg";
import Rel2 from "../assets/images/rel-2.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronRight, ChevronLeft } from 'lucide-react';


function NextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="nextArrow"
      onClick={onClick}
    > <ChevronRight /></div>
  );
}

function PrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="prevArrow"
      onClick={onClick}
    > <ChevronLeft /></div>
  );
}

const RealSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };
  return (
      <div className="realSlider">
        <Slider {...settings}>
              <div className="slider-item"><img src={Rel1} alt="Rel1"/></div>
              <div className="slider-item"><img src={Rel2} alt="Rel2"/></div>
        </Slider>
    </div>
  )
}

export default RealSlider

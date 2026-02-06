import React from 'react';
import Slider from 'react-slick';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './BeforeAfterSliderCarousel.scss';
import { Image } from '@imagekit/react';

function NavNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navNext ban"
      onClick={onClick}
    > <ChevronRight size={20}/></div>
  );
}

function NavPrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navPrev bap"
      onClick={onClick}
    ><ChevronLeft size={20} /></div>
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
    //  responsive: [
    //     {
    //       breakpoint:1024,
    //       settings: {
    //         dots: true,
    //       }
    //     },
    //  ]
      
  };

  return (
    <div className="before-after-carousel">
      <Slider {...settings}>
        {imageData.map((item, index) => (
          <div className="slider-item" key={index}>
            <Image
              urlEndpoint="https://ik.imagekit.io/trozsbxte/pressto/"
              src={item.image}
              alt={item.alt}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BeforeAfterSliderCarousel;

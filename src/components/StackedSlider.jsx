import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import "./StackedSlider.scss";

// Slider Image
import Slider1 from "../assets/images/service/slider-1.jpg";
import Slider2 from "../assets/images/service/slider-2.jpg";
import Slider3 from "../assets/images/service/slider-3.jpg";
import { EffectCards } from 'swiper/modules';

// Sample data - replace with your own
const sliderData = [
  {    
    image: Slider1,
    title: "Slider 1"
  },
  {    
    image: Slider2,
    title: "Slider 2"
  },
  {    
    image: Slider3,
    title: "Slider 3"
  }
];

const StackedSlider = () => { 
  return (
    <div className="slider-wrapper">
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="cardSlider"
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide className="slide" key={index}>
            <div className="image-wrapper">
              <img src={slide.image} alt={slide.title} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default StackedSlider;

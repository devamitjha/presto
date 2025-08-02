import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import "./StackedSlider.scss";


import { EffectCards } from 'swiper/modules';



const StackedSlider = ({sliderData}) => {  
  return (
    <div className="slider-wrapper">
      <Swiper
        initialSlide={1}
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

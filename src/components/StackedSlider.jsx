import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Navigation, Pagination } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Image } from '@imagekit/react';

import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './StackedSlider.scss';

const StackedSlider = ({ sliderData }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="slider-wrapper">
      <Swiper
        initialSlide={1}
        grabCursor={true}
        effect="cards"
        modules={[EffectCards, Navigation, Pagination]}
        className="cardSlider"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // Assign navigation buttons manually before Swiper initializes
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide className="slide" key={index}>
            <div className="image-wrapper">
              <Image
                urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
                src={slide.image}
                alt={slide.title}
              />
            </div>
          </SwiperSlide>
        ))}     
        <div ref={prevRef} className="custom-nav-btn button-prev"><ChevronLeft /></div>
        <div ref={nextRef} className="custom-nav-btn button-next"><ChevronRight /></div>  
      </Swiper>
      
    </div>
  );
};

export default StackedSlider;

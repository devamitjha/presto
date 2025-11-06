import React from 'react';
import Slider from 'react-slick';
import Heading from './common/Heading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Prestige.scss';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination } from 'swiper/modules';
import useWindowSize from '../hooks/useWindowSize';




function NavNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navNext"
      onClick={onClick}
    > <ChevronRight size={16} /></div>
  );
}

function NavPrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navPrev"
      onClick={onClick}
    ><ChevronLeft size={16} /></div>
  );
}


const Prestige = ({ title, data = [], size }) => {
  const { width } = useWindowSize();
  const cssClass = size === "big" ? "center-big" : ""
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow:5,
    slidesToScroll:1,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint:825,
        settings: {
          slidesToShow:4,
          arrows: false,
          slidesToScroll:1,
          dots:true,
        }
      },
      {
        breakpoint:525,
        settings: {
          slidesToShow:2,
          arrows: false,
          slidesToScroll:1,
          dots:true,
        }
      }
    ]
  };

  return (
    <section className="section-prestige no-padding">
      <Heading title={title} />
      <div className="section-container">
        <div className="slider-container prestige-slider autoSlider">
          {
            width >825 ? 
              <Slider {...settings}>
                {data.map((item, index) => (
                  <div className="item" key={index}>
                    <div className="image-conteiner">
                      <img src={item.image} width="120px" height="120px" alt={item.alt} />
                    </div>
                    {
                      item.title && <div className="slider-content">
                      <div className="slider-title">{item.title}</div>
                      <div className="slider-text">{item.text}</div>
                    </div>
                    }
                    
                  </div>
                ))}
              </Slider>
            :
            cssClass ? 
              <Slider {...settings}>
                {data.map((item, index) => (
                  <div className={`item ${cssClass}`} key={index}>
                    <div className="image-conteiner">
                      <img src={item.image} width="120px" height="120px" alt={item.alt} />
                    </div>
                    {
                      item.title && <div className="slider-content">
                      <div className="slider-title">{item.title}</div>
                      <div className="slider-text">{item.text}</div>
                    </div>
                    }
                    
                  </div>
                ))}
              </Slider>
            :
            <Swiper
                slidesPerView={'auto'}
                spaceBetween={16}
                modules={[Pagination]}
                className="slider"
              >
                {
                  data?.map((item, index)=>{
                      return(
                         <SwiperSlide key={index}>
                            <div className="item mobile" key={index}>
                              <div className="image-conteiner">
                                <img src={item.image} width="120px" height="120px" alt={item.alt} />
                              </div>
                              {
                                item.title && <div className="slider-content">
                                <div className="slider-title">{item.title}</div>
                                <div className="slider-text">{item.text}</div>
                              </div>
                              }
                              
                            </div>
                        </SwiperSlide>
                      )
                  })
                }                 
            </Swiper>
          }
          
          
        </div>
      </div>
    </section>
  );
};

export default Prestige;

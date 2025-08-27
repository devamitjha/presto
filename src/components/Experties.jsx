import React from 'react';
import Slider from 'react-slick';
import Heading from './common/Heading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Experties.scss';
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


const Experties = ({ title, data = [], item,  size }) => {
  const { width } = useWindowSize();
  const slidesToShow = parseInt(item);
  const cssClass = size === "big" ? "center-big" : ""
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow,
    slidesToScroll: 3,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: slidesToShow === 5 ? 4 : 3,
        }
      },
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
          slidesToShow: cssClass ? 4 : 1,
          arrows: false,
          slidesToScroll:cssClass ? 4 : 1,
          dots: cssClass ? true : false,
        }
      },
      {
        breakpoint:525,
        settings: {
          slidesToShow: cssClass ? 2 : 1,
          arrows: false,
          slidesToScroll:cssClass ? 2 : 1,
          dots: cssClass ? true : false,
        }
      }
    ]
  };

  return (
    <section className="section-experties">
      <Heading title={title} />
      <div className="section-container">
        <div className="slider-container experties-slider autoSlider">
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

export default Experties;

import React from 'react';
import Slider from 'react-slick';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import './HeroSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import { Image } from '@imagekit/react';

  
import { ButtonWithIcon } from './common/Button';

const BookNowIcon = (
  <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99935 14.333L1.19935 10.733C1.03268 10.6108 0.902127 10.4552 0.807682 10.2663C0.713238 10.0775 0.666016 9.87745 0.666016 9.66634V1.66634C0.666016 1.29967 0.796571 0.985786 1.05768 0.724675C1.31879 0.463563 1.63268 0.333008 1.99935 0.333008H9.99935C10.366 0.333008 10.6799 0.463563 10.941 0.724675C11.2021 0.985786 11.3327 1.29967 11.3327 1.66634V9.66634C11.3327 9.87745 11.2855 10.0775 11.191 10.2663C11.0966 10.4552 10.966 10.6108 10.7993 10.733L5.99935 14.333ZM5.99935 12.6663L9.99935 9.66634V1.66634H1.99935V9.66634L5.99935 12.6663ZM5.29935 8.99967L9.06602 5.23301L8.13268 4.26634L5.29935 7.09968L3.89935 5.69967L2.93268 6.63301L5.29935 8.99967Z" />
  </svg>
);

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




const HeroSlider = ({ heroImages, dir }) => {  
  const dispatch = useDispatch();
  const goToBookNowPage = () => {
    dispatch(setOpenBookNow(true));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />
  };

  return (
    <div className="hero-slider">
      <Slider {...settings}>
        {heroImages.map((img, index) => (
          <div className="slider-item" key={index}>
            <Image
                urlEndpoint={`https://ik.imagekit.io/pressto/images/${dir ? `${dir}/` : ''}`}
                src={img.src}
                alt={img.title}
            />
            <div className="hero-title">
                <h3>Look Good, Feel Great</h3>
                <ButtonWithIcon title="Schedule Pickup" icon={BookNowIcon} className="btn btn-md base-btn secondary overflowHidden" GoTo={goToBookNowPage } />
            </div>            
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;

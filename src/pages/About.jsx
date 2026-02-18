import React from 'react';
import { Helmet } from "react-helmet";
import {useNavigate} from 'react-router';
import Heading from '../components/common/Heading';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import "./About.scss";
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination } from 'swiper/modules';

import useWindowSize from '../hooks/useWindowSize';


//experience
import { Image } from '@imagekit/react';

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>Expert Dry Cleaning and Laundry Services in Mumbai, Delhi, Gurgaon, Bangalore</title>
        <meta name="description" content="Experience premium dry cleaning and laundry services with Pressto India. Our expert team uses advanced technology for spotless result. Schedule your pick-up now" />
        <meta name="keywords" content="about Pressto India, Yvo Metzelaar, premium garment care specialists, luxury brand care, bespoke wardrobe care, sustainable cleaning, artisan expertise, European standards, Gucci Hermes care, Vogue featured"/>
        <link rel="canonical" href="https://www.presstoindia.com/about" />
      </Helmet>
  )
}

const VisionaryMan = () => {
  return (
    <section className="section-container mb-120">
      <Heading title="Meet our Visionary Man" />
      <div className="visionary-section">
        <div className="visionary-content">
          <div className="image-container mobile">
            <Image
              urlEndpoint="https://www.presstoindia.com/media/"
              src="leader.jpg"
              width={3024}
              height={4032}
              alt="Sumant Kasliwal"
            />
            <div className="caption">
              <strong>Sumant Kasliwal</strong>
              <span>Managing Director and Chief Executive Officer, Pressto India</span>
            </div>
          </div>
          <div className="text-content">
            <div className="block mission">
              <h3>Mission</h3>
              <p>
                Our mission is to deliver premium, personalized wardrobe care with precision, passion, and integrity, ensuring every garment, accessory, and home textile receives expert attention, so our customers always look and feel their best.
              </p>
            </div>
            <div className="block vision">
              <h3>Vision</h3>
              <p>
                To be the leading wardrobe care service provider in India while servicing to stylish individuals through quality cleaning methods and processes out of attractive, convenient and transparent locations combined with courteous and knowledgeable staff.
              </p>
            </div>
          </div>
          </div>
      </div>
    </section>
  );
};

const items = [
  { img: "sb-1.jpg", label: "Composeable packaging" },
  { img: "sb-2.jpg", label: "Ph balance" },
  { img: "sb-3.jpg", label: "No harsh chemicals" },
  { img: "sb-4.jpg", label: "Sustainability heart" },
];

const WhatWeStandBy = () => { 
  const { width } = useWindowSize();
  return (
    <section className="section-container mobileSliderContainer mb-120">
      <Heading title="What we stand by" />
      <div className="what-we-stand-by autoSlider">
      {
             width >825 ?
                    <div className="grid-container">
                      {items.map((item) => (
                        <div className="grid-item" key={item.label}>
                          <Image
                              urlEndpoint="https://www.presstoindia.com/media/"
                              src={item.img}
                              alt={item.label}
                            />
                          <div className="overlay">{item.label}</div>
                        </div>
                      ))}
                    </div>
             :
             <Swiper
                slidesPerView={'auto'}
                spaceBetween={28}
                modules={[Pagination]}
                className="slider"
              >    
                      {items.map((item) => (
                        <SwiperSlide key={item.label}>
                          <div className="gridItem">
                            <Image
                                urlEndpoint="https://www.presstoindia.com/media/"
                                src={item.img}
                                alt={item.label}
                              />
                            <div className="overlay">{item.label}</div>
                          </div>
                        </SwiperSlide>
                      ))}             
              </Swiper>
          }  
          </div>          
    </section>
  );
};

const About = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToStoretPage = () => {
      navigate('/store');
  };
  const goToBookNowPage = () => {
      dispatch(setOpenBookNow(true));
  };
  return (
    <div className="aboutpage">
      <HelmetMeta/>
      <div className="main-banner">
          <Image
            urlEndpoint="https://www.presstoindia.com/media/"
            src="about-full.jpg"
            width={1392}
            height={700}
            alt="About Banner"
            className="desktop"
          />
           <Image
            urlEndpoint="https://www.presstoindia.com/media/"
            src="about-small.jpg"
            width={358}
            height={627}
            alt="About Banner mobile"
            className="mobile"
          />
      </div>
      <section className="client my-88">
        <div className="item">
            <span>Pioneering Sustainable Care Since </span>
            <h4> <ScrollAnimatedNumber value={2008} /></h4>
        </div>
      </section>
      <VisionaryMan />
      <div className="section-container  mb-120">
        <Heading title="Trusted Across Continents/ Worldwide Wardrobe Care" />
        <div className="section-pressto-map">
          <div className="pressto-map">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/"
                src="map.jpg"
                width={1760}
                height={792}
                alt="about"
              />
          </div>
        </div>
      </div>
      <WhatWeStandBy />
      <SixColumnlayoutCenter image={["whatwedo1.jpg", "whatwedo2.jpg"]}/>
      <div className="section-container luxaryExperience  mb-120">
        <Heading title="Experience Pressto" />
        <div className="section-luxaryExperience-item">
          <div className="exp-item">
            <h3 className="only-mobile">Locate Store Near you</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/"
                src="exp-6.jpg"
                width={416}
                height={416}
                alt="exp6"
              />
            </div>
            <div className="exp-content">
              <h3 className="only-desktop">Locate Store Near you</h3>
              <p>Find your nearest Pressto and step into effortless, premium care</p>
               <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToStoretPage}>Find Now</div>
            </div>
          </div>
          <div className="exp-item">
            <h3 className="only-mobile pickme">Pickup & Drop</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/"
                src="exp-7.jpg"
                width={416}
                height={416}
                alt="exp7"
              />
            </div>
            <div className="exp-content">
              <h3 className="only-desktop">Pickup & Drop</h3>
              <p>Schedule a pickup and let premium care come to you.</p>
               <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToBookNowPage}>Book an Appointment</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

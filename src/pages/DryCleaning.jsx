import React from 'react'
import StackedSlider from '../components/StackedSlider'
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';
import { Helmet } from 'react-helmet';
import { Image } from '@imagekit/react';
import useWindowSize from '../hooks/useWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination } from 'swiper/modules';

//slider

import Experties from '../components/Experties';
import SolutionFinder from '../components/SolutionFinder';
import LocateUs from '../components/LocateUs';

//video 
import FullWidthBackgroundVideo from '../components/FullWidthBackgroundVideo';


const items = [
  { img:"service/sl-1.jpg", title: "Quality", info:"Every detail matters, we treat your garments with precision and care that shows."},
  { img: "service/sl-2.jpg", title: "Speed", info:"Quick turnarounds, without cutting corners - because your time is valuable."},
  { img: "service/sl-3.jpg", title: "Service", info:"Thoughtful care, personalised for you - from pick-up to delivery."},
  { img: "service/sl-4.jpg", title: "Transparency", info:"No surprises, just honesty, you’ll always know what we’re doing and why."},
];

const sliderData = [
  {    
    image: "service/DryCleaning/slider-2.jpg",
    title: "Slider 2"
  },
  {    
    image: "service/DryCleaning/slider-1.jpg",
    title: "Slider 1"
  },  
  {    
    image: "service/DryCleaning/slider-3.jpg",
    title: "Slider 3"
  },
  {    
    image: "service/DryCleaning/slider-4.jpg",
    title: "Slider 4"
  }
];

const sliderDataMobile = [
  {    
    image: "mobile/service/DryCleaning/dc-slider-1.jpg",
    title: "Slider 2"
  },
  {    
    image: "mobile/service/DryCleaning/dc-slider-2.jpg",
    title: "Slider 1"
  },  
  {    
    image: "mobile/service/DryCleaning/dc-slider-3.jpg",
    title: "Slider 3"
  },
  {    
    image: "mobile/service/DryCleaning/dc-slider-4.jpg",
    title: "Slider 4"
  }
];





const WhatWeStandBy = () => {
   const { width } = useWindowSize();
  return (
    <section className="section-container mobileSliderContainer">
      <Heading title="What we stand by" />
      <div className="what-we-stand-by autoSlider">
        {
          width >825 ?
            <div className="grid-container">
              {items.map((item, index) => (
                <div className="grid-item" key={index}>
                  <Image
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
                    src={item.img}
                    alt="{item.title}"
                  />
                  <div className="overlay">
                    <h4>{item.title}</h4>
                    <p>{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          :         
            <Swiper
              slidesPerView={'auto'}
              spaceBetween={15}
              modules={[Pagination]}
              className="slider"
            >    
                    {items.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className={`gridItem gridItem-${index}`}>
                         <Image
                            urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
                            src={item.img}
                            alt="{item.title}"
                          />
                          <div className="overlay">
                            <h4>{item.title}</h4>
                            <p>{item.info}</p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}             
            </Swiper>
        }
          
      </div>      
    </section>
  );
};

const HelmetMeta = () => (
  <Helmet>
    <title>Premium Dry Cleaning Services - Luxury Fabric Specialists | Expert Artisans</title>
    <meta name="description" content="Professional dry cleaning for luxury & designer garments. Advanced fabric-specific processes, eco-friendly solvents & expert artisan care. Trusted by premium brands." />
    <meta name="keywords" content="premium dry cleaning services, luxury fabric specialists, designer garment care, fabric-specific cleaning, eco-friendly solvents, expert artisans, advanced dry cleaning, luxury brand trusted, premium stain removal, soft water cleaning"/>
    <link rel="canonical" href="https://www.presstoindia.com/service/dry-cleaning" />
  </Helmet>
);

const DryCleaning = () => {   
  const { width } = useWindowSize(); 
  return (
    <>
      <HelmetMeta />
      <div className="section-container serviceSlider">
        <Heading title="Carry the Mint Look" /> 
        {
          width >700 ? <StackedSlider sliderData={sliderData}/>  : <StackedSlider sliderData={sliderDataMobile}/>
        }    
      </div>
      <div className="section-container px-0">
        <div className="center-banner">
          <FullWidthBackgroundVideo
            src= "https://ik.imagekit.io/devamitjha/pressto/video/dry-cleaning.mp4"
            poster="https://ik.imagekit.io/devamitjha/pressto/video/poster-d.jpg"
          />
          <div className="info">
            <h4>Beyond Clean</h4>
            <p>The Pressto Dry Clean Difference
At Pressto, dry cleaning is more than just a service - it’s a science. Our advanced, fabric-specific process gently lifts stains and refreshes garments without compromising texture, colour, or structure. With eco-friendly solvents and expert care at every step, your clothes return not only impeccably clean but truly cared for.</p>
          </div>
        </div>
      </div>
      <div className="section-container solution">
        <Heading title="Find Solution to your Problem" />
        <SolutionFinder selected="dry-cleaning" />        
      </div>
      <WhatWeStandBy />
      <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
      <div className="section-container">
        <Heading title="Find Store Near You" />
        <LocateUs/>
      </div>
      
    </>
  )
}

export default DryCleaning

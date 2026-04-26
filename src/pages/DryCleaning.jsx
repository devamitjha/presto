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
  { img: "service/sl-5.jpg", title: "Service", info:"Thoughtful care, personalised for you - from pick-up to delivery."},
  { img: "service/sl-4.jpg", title: "Transparency", info:"No surprises, just honesty, you'll always know what we're doing and why."},
];

const sliderData = [
  {    
    image: "service/DryCleaning/s1.jpg",
    title: "Slider 2"
  },
  {    
    image: "service/DryCleaning/s2.jpg",
    title: "Slider 1"
  },
  {    
    image: "service/DryCleaning/s5.jpg",
    title: "Slider 3"
  },
  {    
    image: "service/DryCleaning/s6.jpg",
    title: "Slider 4"
  }
];

const sliderDataMobile = [
  {    
    image: "mobile/service/DryCleaning/s1.jpg",
    title: "Slider 2"
  },
  {    
    image: "mobile/service/DryCleaning/s2.jpg",
    title: "Slider 1"
  },
  {    
    image: "mobile/service/DryCleaning/s5.jpg",
    title: "Slider 3"
  },
  {    
    image: "mobile/service/DryCleaning/s6.jpg",
    title: "Slider 4"
  }
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
              {items.map((item, index) => (
                <div className="grid-item" key={index}>
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/"
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
              spaceBetween={28}
              modules={[Pagination]}
              className="slider"
            >    
                    {items.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className={`gridItem gridItem-${index}`}>
                         <Image
                            urlEndpoint="https://www.presstoindia.com/media/"
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

const dryCleaningSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://www.presstoindia.com/#organization', name: 'Pressto India', url: 'https://www.presstoindia.com/' },
    { '@type': 'LocalBusiness', '@id': 'https://www.presstoindia.com/#localbusiness', name: 'Pressto India', url: 'https://www.presstoindia.com/' },
    { '@type': 'Service', name: 'Premium Dry Cleaning Services', provider: { '@id': 'https://www.presstoindia.com/#organization' } },
    { '@type': 'Review', author: { '@type': 'Organization', name: 'Pressto India' }, itemReviewed: { '@id': 'https://www.presstoindia.com/#localbusiness' } },
  ],
};

const HelmetMeta = () => (
  <Helmet>
    <title>Professional & Premium Dry Cleaning Services | Pressto</title>
    <meta name="description" content="Premium dry cleaning services for luxury and designer garments. Advanced fabric care, eco-friendly processes and expert cleaning by Pressto specialists." />
    <meta name="keywords" content="Dry Cleaning Services, Premium Dry Cleaning, Luxury Dry Cleaning, Professional Dry Cleaning, Dry Cleaners Near Me, Designer Garment Dry Cleaning"/>
    <link rel="canonical" href="https://www.presstoindia.com/service/dry-cleaning" />
    <script type="application/ld+json">{JSON.stringify(dryCleaningSchema)}</script>
  </Helmet>
);

const DryCleaning = () => {    
  const { width } = useWindowSize(); 
  return (
    <>
      <HelmetMeta />
      <h1 className="service-page-title">Premium Dry Cleaning Services</h1>
      <div className="section-container serviceSlider mb-120">
        <Heading title="Carry the Mint Look" /> 
        {
          width >700 ? <StackedSlider sliderData={sliderData}/>  : <StackedSlider sliderData={sliderDataMobile}/>
        }    
      </div>
      <div className="section-container px-0 mb-120">
        <div className="center-banner">
          <FullWidthBackgroundVideo
            src= "https://www.presstoindia.com/media/video/dry-cleaning.mp4"
            poster="https://www.presstoindia.com/media/video/poster-d.jpg"
          />
          <div className="info">
            <h4>Beyond Clean</h4>
            <p>The Pressto Dry Clean Difference
At Pressto, dry cleaning is more than just a service - it’s a science. Our advanced, fabric-specific process gently lifts stains and refreshes garments without compromising texture, colour, or structure. With eco-friendly solvents and expert care at every step, your clothes return not only impeccably clean but truly cared for.</p>
          </div>
        </div>
      </div>
      <div className="section-container solution mb-120">
        <Heading title="Find Solution to your Problem" />
        <SolutionFinder selected="dry-cleaning" />        
      </div>
      <WhatWeStandBy />
      <div className="slider-mb-168">
        <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
      </div>
      <div className="section-container mb-120">
        <Heading title="Find Store Near You" />
        <LocateUs/>
      </div>
      
    </>
  )
}

export default DryCleaning

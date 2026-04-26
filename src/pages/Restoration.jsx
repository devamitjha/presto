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
import LocateUsMap from '../components/LocateUs';

//video 
import FullWidthBackgroundVideo from '../components/FullWidthBackgroundVideo';


const items = [
  { img: "service/sl-1.jpg", title: "Quality", info:"Every detail matters, we treat your garments with precision and care that shows."},
  { img: "service/sl-2.jpg", title: "Speed", info:"Quick turnarounds, without cutting corners - because your time is valuable."},
  { img: "service/sl-5.jpg", title: "Service", info:"Thoughtful care, personalised for you - from pick-up to delivery."},
  { img: "service/sl-4.jpg", title: "Transparency", info:"No surprises, just honesty, you’ll always know what we’re doing and why."},
];



const sliderData = [ 
  {    
    image: "service/Restoration/s1.jpg",
    title: "Slider 1"
  }, 
  {    
    image: "service/Restoration/s2.jpg",
    title: "Slider 2"
  },
  {    
    image: "service/Restoration/s3.jpg",
    title: "Slider 3"
  },
  {    
    image: "service/Restoration/s4.jpg",
    title: "Slider 4"
  },
  {    
    image: "service/Restoration/s5.jpg",
    title: "Slider 5"
  },
  {    
    image: "service/Restoration/s6.jpg",
    title: "Slider 6"
  },
  {    
    image: "service/Restoration/s7.jpg",
    title: "Slider 7"
  }
];

const sliderDataMobile = [
  {    
    image: "mobile/service/Restoration/s1.jpg",
    title: "Slider 1"
  },
  {    
    image: "mobile/service/Restoration/s2.jpg",
    title: "Slider 2"
  },   
  {    
    image: "mobile/service/Restoration/s3.jpg",
    title: "Slider 3"
  },
  {    
    image: "mobile/service/Restoration/s4.jpg",
    title: "Slider 4"
  },
  {    
    image: "mobile/service/Restoration/s5.jpg",
    title: "Slider 5"
  },
  {    
    image: "mobile/service/Restoration/s6.jpg",
    title: "Slider 6"
  },
  {    
    image: "mobile/service/Restoration/s7.jpg",
    title: "Slider 7"
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

const shoeBagSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': 'https://www.presstoindia.com/#organization', name: 'Pressto India', url: 'https://www.presstoindia.com/' },
    { '@type': 'LocalBusiness', '@id': 'https://www.presstoindia.com/#localbusiness', name: 'Pressto India', url: 'https://www.presstoindia.com/' },
    { '@type': 'Service', name: 'Shoe & Bag Repair Services', provider: { '@id': 'https://www.presstoindia.com/#organization' } },
    { '@type': 'Review', author: { '@type': 'Organization', name: 'Pressto India' }, itemReviewed: { '@id': 'https://www.presstoindia.com/#localbusiness' } },
  ],
};

const HelmetMeta = () => (
  <Helmet>
    <title>Shoe & Bag Repair Services | Luxury Restoration | Pressto</title>
    <meta name="description" content="Expert shoe repair and bag restoration services by Pressto. Professional leather repair, sneaker cleaning and luxury bag care with precision craftsmanship." />
    <meta name="keywords" content="Shoe Repair Services, Shoe Restoration, Bag Restoration, Luxury Shoe Repair, Leather Bag Repair, Shoe Cleaning Service"/>
    <link rel="canonical" href="https://www.presstoindia.com/service/shoes-and-bag-care" />
    <script type="application/ld+json">{JSON.stringify(shoeBagSchema)}</script>
  </Helmet> 
);

const Restoration = () => {  
   const { width } = useWindowSize();  
  return (
    <>
      <HelmetMeta />
      <h1 className="service-page-title">Shoe & Bag Repair Services</h1>
      <div className="section-container serviceSlider mb-120">
        <Heading title="Carry the Mint Look" />   
        {
          width >700 ? <StackedSlider sliderData={sliderData}/>  : <StackedSlider sliderData={sliderDataMobile}/>
        }  
      </div>
      <div className="section-container px-0 mb-120">
        <div className="center-banner">
          <FullWidthBackgroundVideo
            src= "https://www.presstoindia.com/media/video/Shoes-and-bag.mp4"
            poster="https://www.presstoindia.com/media/video/poster-re-3.jpg"
          />
          <div className="info">
            <h4>Beyond Repair</h4>
            <p>The Pressto Restoration Promise
From scuffed leather to faded fabrics, we bring your favourite shoes and bags back to life, the right way. With specialised techniques and careful restoration, we preserve their original charm while extending their lifespan. Because some things aren’t just accessories - they’re part of your story.</p>
          </div>
        </div>
      </div>
      <div className="section-container solution mb-120">
        <Heading title="Find Solution to your Problem" />
        <SolutionFinder selected="restoration" />
      </div>
      <WhatWeStandBy />
      <div className="slider-mb-168">
        <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
      </div>
      <div className="section-container mb-120">
        <Heading title="Find Store Near You" />
        <LocateUsMap/>
      </div>
    </>
  )
}

export default Restoration

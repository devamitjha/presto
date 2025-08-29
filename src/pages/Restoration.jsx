import React from 'react'
import StackedSlider from '../components/StackedSlider'
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';
import { Helmet } from 'react-helmet';
import { Image } from '@imagekit/react';
import useWindowSize from '../hooks/useWindowSize';



//slider
import Experties from '../components/Experties';
import SolutionFinder from '../components/SolutionFinder';
import LocateUsMap from '../components/LocateUs';

//video 
import FullWidthBackgroundVideo from '../components/FullWidthBackgroundVideo';


const items = [
  { img: "service/sl-1.jpg", title: "Quality", info:"Every detail matters, we treat your garments with precision and care that shows."},
  { img: "service/sl-2.jpg", title: "Speed", info:"Quick turnarounds, without cutting corners - because your time is valuable."},
  { img: "service/sl-3.jpg", title: "Service", info:"Thoughtful care, personalised for you - from pick-up to delivery."},
  { img: "service/sl-4.jpg", title: "Transparency", info:"No surprises, just honesty, you’ll always know what we’re doing and why."},
];



const sliderData = [
  {    
    image: "service/Restoration/slider-2.jpg",
    title: "Slider 2"
  },
  {    
    image: "service/Restoration/slider-1.jpg",
    title: "Slider 1"
  }, 
  {    
    image: "service/Restoration/slider-3.jpg",
    title: "Slider 3"
  }
];

const sliderDataMobile = [
  {    
    image: "mobile/service/Restoration/slider-2.jpg",
    title: "Slider 2"
  },
  {    
    image: "mobile/service/Restoration/slider-1.jpg",
    title: "Slider 1"
  }, 
  {    
    image: "mobile/service/Restoration/slider-3.jpg",
    title: "Slider 3"
  }
];




const WhatWeStandBy = () => {
  return (
    <section className="section-container">
      <Heading title="What we stand by" />
      <div className="what-we-stand-by">
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
      </div>      
    </section>
  );
};

const HelmetMeta = () => (
  <Helmet>
    <title>Luxury Shoe & Bag Restoration - Premium Leather Care Specialists | Pressto</title>
    <meta name="description" content="Expert restoration for luxury shoes & designer bags. Precision leather care, suede cleaning & premium restoration services. Trusted by luxury fashion brands." />
    <meta name="keywords" content="luxury shoe restoration, premium bag care, leather care specialists, designer bag cleaning, suede restoration, luxury leather goods, premium shoe care, precision restoration, fashion brand trusted, leather repair services"/>
    <link rel="canonical" href="https://www.presstoindia.com/service/shoes-and-bag-restoration" />
  </Helmet> 
);

const Restoration = () => {  
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
            src= "https://ik.imagekit.io/devamitjha/pressto/video/Shoes-and-bag.mp4"
            poster="https://ik.imagekit.io/devamitjha/pressto/video/poster-re-3.jpg"
          />
          <div className="info">
            <h4>Beyond Repair</h4>
            <p>The Pressto Restoration Promise
From scuffed leather to faded fabrics, we bring your favourite shoes and bags back to life, the right way. With specialised techniques and careful restoration, we preserve their original charm while extending their lifespan. Because some things aren’t just accessories - they’re part of your story.</p>
          </div>
        </div>
      </div>
      <div className="section-container">
        <Heading title="Find Solution to your Problem" />
        <SolutionFinder selected="restoration" />
      </div>
      <WhatWeStandBy />
      <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
      <div className="section-container">
        <Heading title="Locate Us" />
        <LocateUsMap/>
      </div>
    </>
  )
}

export default Restoration

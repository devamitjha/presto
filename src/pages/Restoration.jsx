import React from 'react'
import StackedSlider from '../components/StackedSlider'
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';
import BeforeAfterSliderCarousel from '../components/BeforeAfterSliderCarousel';

//restoration
import Restoration1 from "../assets/images/beforeAfter/restoring/1.jpg";
import Restoration2 from "../assets/images/beforeAfter/restoring/2.jpg";

//slider
import Slider1 from "../assets/images/service/Restoration/slider-1.jpg";
import Slider2 from "../assets/images/service/Restoration/slider-2.jpg";
import Slider3 from "../assets/images/service/Restoration/slider-3.jpg";

import sl1 from "../assets/images/service/sl-1.jpg";
import sl2 from "../assets/images/service/sl-2.jpg";
import sl3 from "../assets/images/service/sl-3.jpg";
import sl4 from "../assets/images/service/sl-4.jpg";
import CenterBanner from "../assets/images/service/restoration-center-banner.jpg";
import Experties from '../components/Experties';
import SolutionFinder from '../components/SolutionFinder';
import LocateUsMap from '../components/LocateUs';


const items = [
  { img: sl1, title: "Quality", info:"Every detail matters, we treat your garments with precision and care that shows."},
  { img: sl2, title: "Speed", info:"Quick turnarounds, without cutting corners - because your time is valuable."},
  { img: sl3, title: "Service", info:"Thoughtful care, personalised for you - from pick-up to delivery."},
  { img: sl4, title: "Transparency", info:"No surprises, just honesty, you’ll always know what we’re doing and why."},
];



const sliderData = [
  {    
    image: Slider2,
    title: "Slider 2"
  },
  {    
    image: Slider1,
    title: "Slider 1"
  }, 
  {    
    image: Slider3,
    title: "Slider 3"
  }
];

const beforeAfterImage = [
  {image: Restoration1, title: "Restoration 1"},
  {image: Restoration2, title: "Restoration 2"},
];


const WhatWeStandBy = () => {
  return (
    <section className="section-container">
      <Heading title="What we stand by" />
      <div className="what-we-stand-by">
          <div className="grid-container">
            {items.map((item, index) => (
              <div className="grid-item" key={index}>
                <img src={item.img} alt={item.title} />
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


const Restoration = () => {
  return (
    <>
      <div className="section-container">
        <Heading title="Carry the Mint Look" />
        <StackedSlider sliderData={sliderData} />      
      </div>
      <div className="section-container px-0">
        <div className="center-banner">
          <img src={CenterBanner} alt="center banner" width="1920" height="728" />
          <div className="info">
            <h4>Beyond Repair</h4>
            <p>The Pressto Restoration Promise
From scuffed leather to faded fabrics, we bring your favourite shoes and bags back to life, the right way. With specialised techniques and careful restoration, we preserve their original charm while extending their lifespan. Because some things aren’t just accessories - they’re part of your story.</p>
          </div>
        </div>
      </div>
      <div className="section-container">
        <Heading title="Find Solution to your Problem" />
        <SolutionFinder selected="restoration"/>
        <BeforeAfterSliderCarousel imageData={beforeAfterImage} />
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

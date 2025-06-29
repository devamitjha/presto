import React from 'react'
import StackedSlider from '../components/StackedSlider'
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';
import BeforeAfterSliderCarousel from '../components/BeforeAfterSliderCarousel';

//slider
import Slider1 from "../assets/images/service/DryCleaning/slider-1.jpg";
import Slider2 from "../assets/images/service/DryCleaning/slider-2.jpg";
import Slider3 from "../assets/images/service/DryCleaning/slider-3.jpg";
import Slider4 from "../assets/images/service/DryCleaning/slider-4.jpg";


import sl1 from "../assets/images/service/sl-1.jpg";
import sl2 from "../assets/images/service/sl-2.jpg";
import sl3 from "../assets/images/service/sl-3.jpg";
import sl4 from "../assets/images/service/sl-4.jpg";


import CenterBanner from "../assets/images/service/dry-center-banner.jpg";
import Experties from '../components/Experties';
import SolutionFinder from '../components/SolutionFinder';
import LocateUs from '../components/LocateUs';


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
  },
  {    
    image: Slider4,
    title: "Slider 4"
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


const DryCleaning = () => {
  return (
    <>
      <div className="section-container">
        <Heading title="Carry the Mint Look" />
        <StackedSlider sliderData={sliderData}/>      
      </div>
      <div className="section-container px-0">
        <div className="center-banner">
          <img src={CenterBanner} alt="center banner" width="1920" height="728" />
          <div className="info">
            <h4>Beyond Clean</h4>
            <p>The Pressto Dry Clean Difference
At Pressto, dry cleaning is more than just a service - it’s a science. Our advanced, fabric-specific process gently lifts stains and refreshes garments without compromising texture, colour, or structure. With eco-friendly solvents and expert care at every step, your clothes return not only impeccably clean but truly cared for.</p>
          </div>
        </div>
      </div>
      <div className="section-container">
        <Heading title="Find Solution to your Problem" />
        <SolutionFinder/>
        <BeforeAfterSliderCarousel />
      </div>
      <WhatWeStandBy />
      <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
      <div className="section-container">
        <Heading title="Locate Us" />
        <LocateUs/>
      </div>
      
    </>
  )
}

export default DryCleaning

import React, {useState} from 'react'
import StackedSlider from '../components/StackedSlider'
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';
import BeforeAfterSliderCarousel from '../components/BeforeAfterSliderCarousel';

//cleaning
import Cleaning1 from "../assets/images/beforeAfter/cleaning/1.jpg";
import Cleaning2 from "../assets/images/beforeAfter/cleaning/2.jpg";
import Cleaning3 from "../assets/images/beforeAfter/cleaning/3.jpg";
import Cleaning4 from "../assets/images/beforeAfter/cleaning/4.jpg";
import Cleaning5 from "../assets/images/beforeAfter/cleaning/5.jpg";
import Cleaning6 from "../assets/images/beforeAfter/cleaning/6.jpg";
import Cleaning7 from "../assets/images/beforeAfter/cleaning/7.jpg";
import Cleaning8 from "../assets/images/beforeAfter/cleaning/8.jpg";

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



const beforeAfterImage = [
  {image: Cleaning1, title: "Cleaning 1"},
  {image: Cleaning2, title: "Cleaning 2"},
  {image: Cleaning3, title: "Cleaning 3"},
  {image: Cleaning4, title: "Cleaning 4"},
  {image: Cleaning5, title: "Cleaning 5"},
  {image: Cleaning6, title: "Cleaning 6"},
  {image: Cleaning7, title: "Cleaning 7"},
  {image: Cleaning8, title: "Cleaning 8"},
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
   const [active] = useState(false);
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
        {active && <SolutionFinder selected="dry-cleaning" />}
        <BeforeAfterSliderCarousel imageData={beforeAfterImage} />
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

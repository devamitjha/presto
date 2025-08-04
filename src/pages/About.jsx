import React from 'react';
import { Helmet } from "react-helmet";
import {useNavigate} from 'react-router';
import Heading from '../components/common/Heading';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';
import "./About.scss";
import AboutBanner from "../assets/images/about.jpg"
import leader from '../assets/images/leader.jpg';
import PresstoMap from "../assets/images/map.jpg";

import sb1 from "../assets/images/sb-1.jpg";
import sb2 from "../assets/images/sb-2.jpg";
import sb3 from "../assets/images/sb-3.jpg";
import sb4 from "../assets/images/sb-4.jpg";
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';

//services 
import whatwedo1 from "../assets/images/whatwedo1.jpg";
import whatwedo2 from "../assets/images/whatwedo2.jpg";

//experience
import Exp6 from "../assets/images/exp-6.jpg";
import Exp7 from "../assets/images/exp-7.jpg";
import { Button } from '../components/common/Button';

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>About Page | About Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
  )
}

const VisionaryMan = () => {
  return (
    <section className="section-container">
      <Heading title="Meet our Visionary Man" />
      <div className="visionary-section">
        <div className="visionary-content">
        <div className="image-container">
          <img src={leader} alt="Yvo Metzelaar" width="868" height="780"/>
          <div className="caption">
            <strong>Yvo Metzelaar</strong>
            <span>Managing Director, Pressto India</span>
          </div>
        </div>
        <div className="text-content">
          <div className="block mission">
            <h3>Mission</h3>
            <p>
              Our mission is to deliver premium, personalized wardrobe care with precision,
              passion, and integrity, ensuring every garment, accessory, and home textile receives
              expert attention, so our customers always look and feel their best.
            </p>
          </div>
          <div className="block vision">
            <h3>Vision</h3>
            <p>
              To be the leading wardrobe care service provider in India while servicing
              stylish individuals through quality cleaning methods and processes out of attractive,
              convenient and transparent locations combined with courteous and knowledgeable staff.
            </p>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
};

const items = [
  { img: sb1, label: "Composeable packaging" },
  { img: sb2, label: "Ph balance" },
  { img: sb3, label: "No harsh chemicals" },
  { img: sb4, label: "Sustainability heart" },
];

const WhatWeStandBy = () => {
  return (
    <section className="section-container">
      <Heading title="What we stand by" />
      <div className="what-we-stand-by">
          <div className="grid-container">
            {items.map((item, index) => (
              <div className="grid-item" key={index}>
                <img src={item.img} alt={item.label} />
                <div className="overlay">{item.label}</div>
              </div>
            ))}
          </div>
      </div>      
    </section>
  );
};

const About = () => {
  const navigate = useNavigate();
  const goToStoretPage = () => {
      navigate('/store');
  };
  const goToBookNowPage = () => {
      navigate('/book-now');
  };
  return (
    <div className="aboutpage">
      <HelmetMeta/>
      <div className="main-banner">
        <img  src={AboutBanner} alt="about" width="1872" height="936" />
      </div>
      <section className="client">
        <div className="item">
            <span>Pioneering Sustainable Care Since </span>
            <h4> <ScrollAnimatedNumber value={2008} /></h4>
        </div>
      </section>
      <VisionaryMan />
      <div className="section-container">
        <Heading title="Trusted Across Continents/ Worldwide Wardrobe Care" />
        <div className="section-pressto-map">
          <div className="pressto-map">
            <img  src={PresstoMap} alt="about" width="1760" height="792" />
          </div>
        </div>
      </div>
      <WhatWeStandBy />
      <SixColumnlayoutCenter image={[whatwedo1, whatwedo2]} />
      <div className="section-container">
        <Heading title="Experience Pressto" />
        <div className="section-luxaryExperience-item">
          <div className="exp-item">
            <div className="img-container">
              <img src={Exp6} alt="exp6" width="416" height="416" />
            </div>
            <div className="exp-content">
              <h3>Locate Store Near you</h3>
              <p>Find your nearest Pressto and step into effortless, premium care</p>
               <Button title="Find Now" className="btn btn-md base-btn secondary overflowHidden" GoTo={goToStoretPage}/>
            </div>
          </div>
          <div className="exp-item">
            <div className="img-container">
              <img src={Exp7} alt="exp7" width="416" height="416" />
            </div>
            <div className="exp-content">
              <h3>Pickup & Drop</h3>
              <p>Schedule a pickup and let premium care come to you.</p>
               <Button title="Book an Appointment" className="btn btn-md base-btn secondary overflowHidden" GoTo={goToBookNowPage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

import React from 'react'
import { Helmet } from "react-helmet";
import HeroSlider from "../components/HeroSlider";
import "./Home.scss";
import Client from '../components/Client';
import SixColumnlayout from '../components/SixColumnlayout';
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import Experties from '../components/Experties';
import Heading from '../components/common/Heading';
import Spotlight from "../assets/images/sp-1.jpg";
import Spotlight2 from "../assets/images/sp-2.jpg";
import Spotlight3 from "../assets/images/sp-3.jpg";
import Spotlight4 from "../assets/images/sp-4.jpg";
import Spotlight5 from "../assets/images/sp-5.jpg";
import Spotlight6 from "../assets/images/sp-6.jpg";
import { Button } from '../components/common/Button';

import Gucci from "../assets/images/gucci.png";
import Hermes from "../assets/images/hermes.png";
import Ferragamo from "../assets/images/ferragamo.png";
import Louis from "../assets/images/louis.png";
import Balenciaga from "../assets/images/balenciaga.png";

import Experience1 from "../assets/images/exp-1.jpg";
import Experience2 from "../assets/images/exp-2.jpg";
import Experience3 from "../assets/images/exp-3.jpg";
import Experience4 from "../assets/images/exp-4.jpg";
import Experience5 from "../assets/images/exp-5.jpg";
import GoogleReviews from '../components/GoogleReviews';
import RealSlider from '../components/RealSlider';
import useWindowSize from "../hooks/useWindowSize"

//in the spot light

const SectionSpotlight = () => {
  const { width } = useWindowSize();
  return (
    <section className="section-container spotlight">
      <Heading title="In the Spotlight" />
      <div className="spotlight-item">
        <div className="item">
          <img src={Spotlight} alt="spotlight1" width="" height="" />
        </div>
        {
          width > 1600 && <div className="item">
            <img src={Spotlight2} alt="spotlight2" width="" height="" />
          </div>
        }
        
        <div className="item">
          <img src={Spotlight2} alt="spotlight2" width="" height="" />
        </div>
        <div className="item collage">
          <div className="info">
            At Pressto, every Presstodian brings our motto - Look Good, Feel Better; to life with heartfelt care, sharp skill, and an eye for detail. It’s not just what we do, it’s how we do it, with quiet precision and pride in every fold
          </div>
          <div className="image-collage">
            <div className="grid">
              <img src={Spotlight3} alt="spotlight3" width="" height="" />
            </div>
            <div className="grid">
              <img src={Spotlight4} alt="spotlight4" width="" height="" />
            </div>
            <div className="grid">
              <img src={Spotlight5} alt="spotlight5" width="" height="" />
            </div>
            <div className="grid">
              <img src={Spotlight6} alt="spotlight6" width="" height="" />
            </div>
          </div>
          <Button title="View Gallery" className="btn btn-md base-btn outlined overflowHidden" />
        </div>
      </div>
    </section>
  )
};

//care partner

const CarePartner = () => {
  return (
    <section className="section-container care-partner">
      <Heading title="Our Care Partners" />
      <div className="care-partner-container">
        <div className="item">
          <img src={Gucci} alt="Gucci" width="148px" height="148px" />
        </div>
        <div className="item">
          <img src={Hermes} alt="Hermes" width="148px" height="148px" />
        </div>
        <div className="item">
          <img src={Ferragamo} alt="Ferragamo" width="148px" height="148px" />
        </div>
        <div className="item">
          <img src={Louis} alt="Louis" width="148px" height="148px" />
        </div>
        <div className="item">
          <img src={Balenciaga} alt="Balenciaga" width="148px" height="148px" />
        </div>
      </div>
    </section>
  )
};

// Luxary experience
const LuxaryExperience = () => {
  return (
    <section className="section-container luxaryExperience">
      <Heading title="Luxury Experience Indeed" />
      <div className="luxaryExperience-item">
        <div className="item">
          <img src={Experience1} alt="Experience1" width="" height="" />
        </div>
        <div className="item">
          <img src={Experience2} alt="Experience2" width="" height="" />
        </div>
        <div className="item collage">
          <div className="image-collage">
            <div className="grid">
              <img src={Experience3} alt="Experience3" width="" height="" />
            </div>
            <div className="grid">
              <img src={Experience4} alt="Experience4" width="" height="" />
            </div>
            <div className="grid">
              <img src={Experience5} alt="Experience5" width="" height="" />
            </div>
            <div className="grid content">
              <div className="info">
                <h4>About Us</h4>
                <p>Best in Class Dry Cleaning for Luxury and Branded Clothes, You know who has been the face of the town.</p>
              </div>
              <Button title="Know More" className="btn btn-md base-btn outlined overflowHidden" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
};

// real and Review
const RealStories = () => {
  return (
    <section className="section-container realStories">
      <Heading title="Real Stories, Real Trust" />      
      <div className="real-container">
        <RealSlider/>
        <GoogleReviews/>
      </div>
    </section>
  )
}

const Home = () => {
  return (
    <section className="home">
      <Helmet>
        <title>Home Page | Home Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
      <HeroSlider />
      <Client />
      <SixColumnlayout />
      <Experties/>
      <SixColumnlayoutCenter /> 
      <RealStories/>
      <SectionSpotlight />
      <CarePartner />
      <LuxaryExperience/>
    </section>
  )
}

export default Home

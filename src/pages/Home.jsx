import React from 'react';
import { Helmet } from 'react-helmet';
import {useNavigate} from 'react-router';

import HeroSlider from '../components/HeroSlider';
import Client from '../components/Client';
import SixColumnlayout from '../components/SixColumnlayout';
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import Experties from '../components/Experties';
import Heading from '../components/common/Heading';
import GoogleReviews from '../components/GoogleReviews';
import RealSlider from '../components/RealSlider';
import { Button } from '../components/common/Button';

import './Home.scss';

//hero slider
import Image1 from '../assets/images/mainbanner/banner-1.jpg';
import Image2 from '../assets/images/mainbanner/banner-2.jpg';
import Image3 from '../assets/images/mainbanner/banner-3.jpg';

//services 
import serviceTshirt from "../assets/images/service-tshirt.jpg";
import serviceBag from "../assets/images/service-bag.jpg";

// Assets
import Spotlight from '../assets/images/spotlight/sp-1.jpg';
import Spotlight2 from '../assets/images/spotlight/sp-2.jpg';
import Spotlight3 from '../assets/images/spotlight/sp-3.jpg';
import Spotlight4 from '../assets/images/spotlight/sp-4.jpg';
import Spotlight5 from '../assets/images/spotlight/sp-5.jpg';
import Spotlight6 from '../assets/images/spotlight/sp-6.jpg';
import Spotlight7 from '../assets/images/spotlight/sp-7.jpg';



import Experience1 from '../assets/images/exp-1.jpg';
import Experience2 from '../assets/images/exp-2.jpg';
import Experience3 from '../assets/images/exp-3.jpg';
import Experience4 from '../assets/images/exp-4.jpg';
import Experience5 from '../assets/images/exp-5.jpg';

import useWindowSize from '../hooks/useWindowSize';

import { expertiseData } from '../api/expertiseData';
import { brandRecognition } from '../api/brandRecognition';
import { carePartners } from '../api/carePartners';


// Spotlight Section
const SectionSpotlight = () => {
  const { width } = useWindowSize();

  return (
    <section className="section-container spotlight">
      <Heading title="In the Spotlight" />
      <div className="spotlight-item">
        <div className="item">
          <img src={Spotlight} alt="Showcase1" />
        </div>

        {width > 1600 && (
          <div className="item">
            <img src={Spotlight2} alt="Showcase2" />
          </div>
        )}

        <div className="item">
          <img src={Spotlight3} alt="Showcase3" />
        </div>

        <div className="item collage">
          <div className="info">
            At Pressto, every Presstodian brings our motto - Look Good, Feel Better; to life with heartfelt care,
            sharp skill, and an eye for detail. It’s not just what we do, it’s how we do it, with quiet precision and pride in every fold
          </div>
          <div className="image-collage">
            {[Spotlight4, Spotlight5, Spotlight6, Spotlight7].map((img, index) => (
              <div className="grid" key={index}>
                <img src={img} alt={`Spotlight Collage ${index + 1}`} />
              </div>
            ))}
          </div>
          <Button title="View Gallery" className="btn btn-md base-btn outlined overflowHidden" />
        </div>
      </div>
    </section>
  );
};




// Luxury Experience Section
const LuxaryExperience = () => {
  const navigate = useNavigate();
  const goToContactPage = () => {
      navigate('/contact');
  };
  return (
    <section className="section-container luxaryExperience">
      <Heading title="Luxury Experience Indeed" />
      <div className="luxaryExperience-item">
        <div className="item">
          <img src={Experience1} alt="Luxury Experience 1" />
        </div>
        <div className="item">
          <img src={Experience2} alt="Luxury Experience 2" />
        </div>
        <div className="item collage">
          <div className="image-collage">
            {[Experience3, Experience4, Experience5].map((img, index) => (
              <div className="grid" key={index}>
                <img src={img} alt={`Luxury Experience ${index + 3}`} />
              </div>
            ))}
            <div className="grid content">
              <div className="info">
                <h4>About Us</h4>
                <p>Best in Class Dry Cleaning for Luxury and Branded Clothes, You know who has been the face of the town.</p>
              </div>
              <Button title="Know More" className="btn btn-md base-btn outlined overflowHidden" GoTo={goToContactPage }/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// Real Stories & Reviews Section
const RealStories = () => (
  <section className="section-container realStories">
    <Heading title="Real Stories, Real Trust" />
    <div className="real-container">
      <GoogleReviews />
      <RealSlider />
    </div>
  </section>
);

 const heroImages = [
    { src: Image1, title: 'Look Good, Feel Great' },
    { src: Image2, title: 'Look Good, Feel Great' },
    { src: Image3, title: 'Look Good, Feel Great' }
 ];


// Main Home Component
const Home = () => {  
  return (
    <section className="home">
      <Helmet>
        <title>Pressto India | Premium Garment Care & Dry Cleaning</title>
        <meta
          name="description"
          content="Premium garment care with sustainable luxury. Explore Pressto's professional dry cleaning services, trusted by global fashion brands."
        />
        <meta
          name="keywords"
          content="dry cleaning, garment care, luxury clothes cleaning, branded clothes laundry, eco-friendly laundry"
        />
        <link rel="canonical" href="https://www.pressto.in" />
      </Helmet>

      <HeroSlider heroImages={heroImages}/>
      <Client />
      <SixColumnlayout />
      <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4"/>
      <SixColumnlayoutCenter image={[serviceTshirt, serviceBag]}/>
      <RealStories />
      <SectionSpotlight />
      <Experties title="The Prestige We've Pressed" data={carePartners} item="5"/>
      <LuxaryExperience />
      <Experties title="Brand Recognition" data={brandRecognition} item="5"/>      
    </section>
  );
};

export default Home;

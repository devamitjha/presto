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

//in the spot light

const SectionSpotlight = () => { 
  return (
    <section className="section-container spotlight">
      <Heading title="In the Spotlight" />
      <div className="spotlight-item">
        <div className="item">
          <img src={Spotlight} alt="spotlight1" width="" height=""/>
        </div>
        <div className="item">
          <img src={Spotlight2} alt="spotlight2" width="" height=""/>
        </div>
        <div className="item">
          <img src={Spotlight2} alt="spotlight2" width="" height=""/>
        </div>
        <div className="item collage">
          <div className="info">
            At Pressto, every Presstodian brings our motto - Look Good, Feel Better; to life with heartfelt care, sharp skill, and an eye for detail. It’s not just what we do, it’s how we do it, with quiet precision and pride in every fold
          </div>
          <div className="image-collage">
            <div className="grid">
              <img src={Spotlight3} alt="spotlight3" width="" height=""/>
            </div>
            <div className="grid">
               <img src={Spotlight4} alt="spotlight4" width="" height=""/>
            </div>
            <div className="grid">
              <img src={Spotlight5} alt="spotlight5" width="" height=""/>
            </div>
            <div className="grid">
              <img src={Spotlight6} alt="spotlight6" width="" height=""/>
            </div>              
          </div>
           <Button title="View Gallery" className="btn btn-md base-btn outlined overflowHidden"/>
        </div>       
      </div>
      <div className="viewAll">
        <Button title="View All" className="btn btn-md base-btn secondary overflowHidden"/>
      </div>
    </section>
  )
}

//care partner

const CarePartner = () => {
  return (
    <section className="section-container care-partner">
      <Heading title="Our Care Partners" />
      <div className="care-partner-container">
        <div className="item">
          <img src={Spotlight2} alt="spotlight2" width="" height=""/>
        </div>
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
      <SectionSpotlight />
      <CarePartner/>
    </section>
  )
}

export default Home

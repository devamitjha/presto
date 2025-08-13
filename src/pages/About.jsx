import React from 'react';
import { Helmet } from "react-helmet";
import {useNavigate} from 'react-router';
import Heading from '../components/common/Heading';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import "./About.scss";
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';


//experience
import { Button } from '../components/common/Button';
import { Image } from '@imagekit/react';

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>About Page | About Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.presstoindia.com" />
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
          <Image
            urlEndpoint="https://ik.imagekit.io/pressto/images/"
            src="leader.jpg"
            width={868}
            height={780}
            alt="Yvo Metzelaar"
          />
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
  { img: "sb-1.jpg", label: "Composeable packaging" },
  { img: "sb-2.jpg", label: "Ph balance" },
  { img: "sb-3.jpg", label: "No harsh chemicals" },
  { img: "sb-4.jpg", label: "Sustainability heart" },
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
                    urlEndpoint="https://ik.imagekit.io/pressto/images/"
                    src={item.img}
                    alt={item.label}
                  />
                <div className="overlay">{item.label}</div>
              </div>
            ))}
          </div>
      </div>      
    </section>
  );
};

const About = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToStoretPage = () => {
      navigate('/store');
  };
  const goToBookNowPage = () => {
      dispatch(setOpenBookNow(true));
  };
  return (
    <div className="aboutpage">
      <HelmetMeta/>
      <div className="main-banner">
          <Image
            urlEndpoint="https://ik.imagekit.io/pressto/images/"
            src="about.jpg"
            width={1872}
            height={936}
            alt="About Banner"
          />
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
              <Image
                urlEndpoint="https://ik.imagekit.io/pressto/images/"
                src="map.jpg"
                width={1760}
                height={792}
                alt="about"
              />
          </div>
        </div>
      </div>
      <WhatWeStandBy />
      <SixColumnlayoutCenter image={["whatwedo1.jpg", "whatwedo2.jpg"]}/>
      <div className="section-container">
        <Heading title="Experience Pressto" />
        <div className="section-luxaryExperience-item">
          <div className="exp-item">
            <div className="img-container">
              <Image
                urlEndpoint="https://ik.imagekit.io/pressto/images/"
                src="exp-6.jpg"
                width={416}
                height={416}
                alt="exp6"
              />
            </div>
            <div className="exp-content">
              <h3>Locate Store Near you</h3>
              <p>Find your nearest Pressto and step into effortless, premium care</p>
               <Button title="Find Now" className="btn btn-md base-btn secondary overflowHidden" GoTo={goToStoretPage}/>
            </div>
          </div>
          <div className="exp-item">
            <div className="img-container">
              <Image
                urlEndpoint="https://ik.imagekit.io/pressto/images/"
                src="exp-7.jpg"
                width={416}
                height={416}
                alt="exp7"
              />
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

import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {useNavigate} from 'react-router';
import { Image } from '@imagekit/react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';

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

// Assets

import { expertiseData } from '../api/expertiseData';
import { brandRecognition } from '../api/brandRecognition';
import { carePartners } from '../api/carePartners';
import AnimatedCard from '../components/motionCard/AnimatedCard';
// import Reviews from '../components/Reviews';

// Spotlight Section
const SectionSpotlight = () => {
  const [open, setOpen] = useState(false)
  const spolightPopupItem = [
    { id: 1, img: "1.jpg", description: 'Details for item one.' },
    { id: 2, img: "2.jpg", description: 'Details for item one.' },
    { id: 3, img: "3.jpg", description: 'Details for item one.' },
    { id: 4, img: "4.jpg", description: 'Details for item one.' },
    { id: 5, img: "5.jpg", description: 'Details for item one.' },
    { id: 6, img: "6.jpg", description: 'Details for item one.' },
    { id: 7, img: "7.jpg", description: 'Details for item one.' },
  ];

  return (
    <section className="section-container spotlight">
      <Heading title="In the Spotlight" />
      <div className="spotlight-item">
        <div className="item">
            <Image
              urlEndpoint="https://ik.imagekit.io/pressto/images/spotlight/"
              src="sp-1.jpg"
              alt="Showcase1"
            />
        </div>

        <div className="item">
          <Image
              urlEndpoint="https://ik.imagekit.io/pressto/images/spotlight/"
              src="sp-2.jpg"
              alt="Showcase2"
            />
        </div>

        <div className="item collage">
          <div className="info">
            At Pressto, every Presstodian brings our motto - Look Good, Feel Better; to life with heartfelt care,
            sharp skill, and an eye for detail. It’s not just what we do, it’s how we do it, with quiet precision and pride in every fold
          </div>
          <div className="image-collage">
            {["sp-3.jpg", "sp-4.jpg"].map((img, index) => (
              <div className="grid" key={index}>
                  <Image
                      urlEndpoint="https://ik.imagekit.io/pressto/images/spotlight/"
                      src={img}
                      alt={`Spotlight Collage ${index + 1}`}
                  />
              </div>
            ))}
          </div>
          <div title="View Gallery" className="btn btn-md base-btn outlined overflowHidden" onClick={() => setOpen(true)}>View Gallery</div>
        </div>
      </div>
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        // defaultSnap={({ snapPoints, lastSnap }) =>
        //     lastSnap ?? Math.min(...snapPoints)
        // }
        snapPoints={({ maxHeight }) => [
            maxHeight - maxHeight /5.5,
            maxHeight * 0.9,
        ]}
        className="custom-bottom-sheet"
        header={<div className="sheetHeader">Gallery</div>}
        footer={<div className="sheetFooter">© Pressto Gallery</div>}
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          {/* Gallery content inside sheet */}
          <div className="sheet-gallery-grid">
            <AnimatedCard spolightItem={spolightPopupItem}/>
          </div>
        </div>
      </BottomSheet>
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
          <Image
            urlEndpoint="https://ik.imagekit.io/pressto/images/"
            src="exp-1.jpg"
            alt="Luxury Experience 1"
          />
        </div>
        <div className="item">
          <Image
            urlEndpoint="https://ik.imagekit.io/pressto/images/"
            src="exp-2.jpg"
            alt="Luxury Experience 2"
          />
        </div>
        <div className="item collage">
          <div className="image-collage">
            {["exp-3.jpg", "exp-4.jpg", "exp-5.jpg"].map((img, index) => (
              <div className="grid" key={index}>
                 <Image
                    urlEndpoint="https://ik.imagekit.io/pressto/images/"
                    src={img}
                    alt={`Luxury Experience ${index + 3}`}
                  />
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
    { src: "banner-1.jpg", title: 'Look Good, Feel Great' },
    { src: "banner-2.jpg", title: 'Look Good, Feel Great' },
    { src: "banner-3.jpg", title: 'Look Good, Feel Great' }
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

      <HeroSlider heroImages={heroImages} dir="mainbanner"/>
      <Client />
      <SixColumnlayout />
      <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4"/>
      <SixColumnlayoutCenter image={["service-tshirt.jpg", "service-bag.jpg"]}/>
      {/* <Reviews /> */}
      <RealStories />
      <SectionSpotlight />
      <Experties title="The Prestige We've Pressed" data={carePartners} item="5"/>
      <LuxaryExperience />
      <Experties title="Brand Recognition" data={brandRecognition} item="5"/>      
    </section>
  );
};

export default Home;

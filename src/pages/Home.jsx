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
import { expertiseData } from '../api/expertiseData';
import { brandRecognition } from '../api/brandRecognition';
import { carePartners } from '../api/carePartners';
import AnimatedCard from '../components/motionCard/AnimatedCard';
import useWindowSize from '../hooks/useWindowSize';
import { ArrowDown } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination } from 'swiper/modules';

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
              urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/spotlight/"
              src="sp-1.jpg"
              alt="Showcase1"
            />
        </div>

        <div className="item md-hide">
          <Image
              urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/spotlight/"
              src="sp-2.jpg"
              alt="Showcase2"
            />
        </div>

        <div className="item collage">
          <p className="md-hide">In the Spotlight</p>
          <div className="info md-hide">
            At Pressto, every Presstodian brings our motto - Look Good, Feel Better; to life with heartfelt care,
            sharp skill, and an eye for detail. It’s not just what we do, it’s how we do it, with quiet precision and pride in every fold
          </div>
          <div className="image-collage md-hide">
            {["sp-3.jpg", "sp-4.jpg"].map((img, index) => (
              <div className="grid" key={index}>
                  <Image
                      urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/spotlight/"
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
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const goToContactPage = () => {
      navigate('/contact');
  };
  return (
    <section className="section-container luxaryExperience autoSlider">
      <Heading title="Luxury Experience Indeed" />
      {
        width >=820 ? 
        <div className="luxaryExperience-item">
          <div className="item">
            <Image
              urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
              src="exp-1.jpg"
              alt="Luxury Experience 1"
            />
          </div>
          <div className="item">
            <Image
              urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
              src="exp-2.jpg"
              alt="Luxury Experience 2"
            />
          </div>
          <div className="item collage">
            <div className="image-collage">
              {["exp-3.jpg", "exp-4.jpg", "exp-5.jpg"].map((img, index) => (
                <div className="grid" key={index}>
                  <Image
                      urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
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
        :
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={16}
            modules={[Pagination]}
            className="slider"
          >
             <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
                    src="exp-1.jpg"
                    alt="Luxury Experience 1"
                  />
                </div>
              </SwiperSlide>  
              <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/"
                    src="exp-2.jpg"
                    alt="Luxury Experience 2"
                  />
                </div>
              </SwiperSlide>  
               <SwiperSlide>
                <div className="luxurySlider">                 
                  <Image
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/mobile/"
                    src="service-3.jpg"
                    alt="Luxury Experience 2"
                  />
                </div>
              </SwiperSlide>
               <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/mobile/"
                    src="service-4.jpg"
                    alt="Luxury Experience 2"
                  />
                </div>
              </SwiperSlide>
               <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/mobile/"
                    src="service-5.jpg"
                    alt="Luxury Experience 2"
                  />
                </div>
              </SwiperSlide>             
        </Swiper>

      }
      
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

 const heroImagesMobile = [
    { src: "banner-1.jpg", title: 'Look Good, Feel Great' },
    { src: "banner-2.jpg", title: 'Look Good, Feel Great' },
    { src: "banner-3.jpg", title: 'Look Good, Feel Great' }
 ];

 


// Main Home Component
const Home = () => {  
  const { width } = useWindowSize();
  return (
    <section className="home">
      <Helmet>
        <title>Premium Luxury Dry Cleaning & Garment Care - Pressto India | Expert Artisans</title>
        <meta
          name="description"
          content="India's premium garment care specialists serving luxury brands. Expert artisans, soft water technology & eco-friendly processes across 45+ locations in Mumbai, Delhi & Bangalore"/>
        <meta name="keywords" content=" premium dry cleaning, luxury garment care, expert artisans, soft water cleaning, eco-friendly premium, Mumbai Delhi Bangalore, designer clothes care, pickup delivery, bespoke service, European standards, Pressto India"/>
        <link rel="canonical" href="https://www.presstoindia.com/" />
      </Helmet>
      {
        width >1024 ?<HeroSlider heroImages={heroImages} dir="mainbanner" type="desktop"/> :<HeroSlider heroImages={heroImagesMobile} dir="mainbanner" type="mobile"/>
      }      
      
      <Client />
      {
        width <1025 &&  <div className="d-flex justify-center-center align-items-center mt-4 mb-5">
                          <div className="text-uppercase btn-lg rounded-pill py-3 px-4 border border-secondary readReviews">Read Reviews <span className="d-inline-block ml-1"><ArrowDown size={20}/></span></div> 
                        </div>
      }
      <SixColumnlayout />
      <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" size="small"/>
      <SixColumnlayoutCenter image={["service-tshirt.jpg", "service-bag.jpg"]}/>
      <RealStories />
      <SectionSpotlight />
      <Experties title="The Prestige We've Pressed" data={carePartners} item="5" size="big"/>
      <LuxaryExperience />
      <Experties title="Brand Recognition" data={brandRecognition} item="5" size="big"/>      
    </section>
  );
};

export default Home;

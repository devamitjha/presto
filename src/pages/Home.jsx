import React, {useState, useRef } from 'react';
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
import { ArrowDown, ChevronLeft, X } from 'lucide-react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination } from 'swiper/modules';
import Prestige from '../components/Prestige';
import Card from '../components/motionCard/Card';

// Spotlight Section
const SectionSpotlight = () => {
  const [open, setOpen] = useState(false);
  const [openCard, setOpenCard] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { width } = useWindowSize();

  const spolightPopupItem = [
    { id: 1, img: "7.jpg", title: "VOGUE PROMOTION-1", description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. seven." },
    { id: 2, img: "1.jpg", title: "VOGUE PROMOTION-2", description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. one." },
    { id: 3, img: "2.jpg", title: "VOGUE PROMOTION-3", description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. two." },
    { id: 4, img: "3.jpg", title: "VOGUE PROMOTION-4", description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. three." },
    { id: 5, img: "4.jpg", title: "VOGUE PROMOTION-5", description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. four." },
    { id: 6, img: "5.jpg", title: "VOGUE PROMOTION-6", description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. five." },
    { id: 7, img: "6.jpg", title: "VOGUE PROMOTION-7", description: "Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. six." },
  ];

  const setCardOpen = (item) => {
    setSelectedItem(item);
    setOpen(false);
    setOpenCard(true);
    //data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: "know_more_btn_click",
        event_type:"media_popup_open"
    });
  };

  const setPrevCardOpen = () => {
    setOpenCard(false);
    if (width > 820) {
      setOpen(true);
    }else{
      console.log("hi");
    }
  };  

  const openSheet = (item) => {   
    setOpen(true);
    //data layer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: "view_gallery_btn_click",
        event_type:"media_popup_open"
    });
  };

  return (
    <section className="section-container spotlight autoSlider mb-120">
      <Heading title="In the Spotlight" />
      {
        width >=820 ?       
          <div className="spotlight-item">
            <div className="item">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/spotlight/"
                src="7.jpg"
                alt="Showcase1"
              />
            </div>

            <div className="item md-hide">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/spotlight/"
                src="sp-2.jpg"
                alt="Showcase2"
              />
            </div>

            <div className="item collage">
              <p className="md-hide">In the Spotlight</p>
              <div className="info md-hide">
                At Pressto, every Presstodian brings our motto - Free Pickup & Drop; to life with heartfelt care,
                sharp skill, and an eye for detail. It’s not just what we do, it’s how we do it, with quiet precision and pride in every fold
              </div>
              <div className="image-collage md-hide">
                {["sp-3.jpg", "sp-4.jpg"].map((img, index) => (
                  <div className="grid" key={index}>
                    <Image
                      urlEndpoint="https://www.presstoindia.com/media/spotlight/"
                      src={img}
                      alt={`Spotlight Collage ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
              <div
                className="btn btn-md base-btn outlined overflowHidden"
                onClick={openSheet}
              >
                View Gallery
              </div>
            </div>
          </div>
        :     
        <> 
          <Swiper
            slidesPerView={'auto'}
            spaceBetween={28}
            modules={[Pagination]}
            className="slider"
          >
            {spolightPopupItem.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="item" onClick={() => setCardOpen(item)} style={{position:'relative'}}>
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/spotlight/"
                    src={item.img}
                    alt="Showcase1"
                  />
                  <div style={{
                    width: "150px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: "50%",
                    bottom: "20px",
                    transform: "translateX(-50%)",
                    cursor: "pointer",
                    borderRadius:'99999px',
                    border:"1px solid #333",
                    backgroundColor:'white',
                    zIndex:2
                  }}>Know More</div>
                </div>
              </SwiperSlide> 
            ))}       
          </Swiper>
            <div className="d-flex justify-center-center align-items-center mt-4 mb-5">
              <div
                  className="btn btn-md base-btn outlined overflowHidden"
                  onClick={openSheet}
                >
                View Gallery
              </div>
            </div>
        </>  

      }

      {/* First BottomSheet */}
      <BottomSheet
        open={open}
        onDismiss={() => setOpen(false)}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5.5,
          maxHeight * 0.9,
        ]}
        className="custom-bottom-sheet"
        header={
          <>
            <div className="sheetHeader">Media & Mentions</div>
            <div className="closesheet" onClick={() => setOpen(false)}>
              <X />
            </div>
          </>
        }
        footer={<div className="sheetFooter">© Pressto Gallery</div>}
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <div className="sheet-gallery-grid">
            <div className="grid">
              {spolightPopupItem.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onClick={() => setCardOpen(item)}
                />
              ))}
            </div>
          </div>
        </div>
      </BottomSheet>

      {/* Second BottomSheet */}
      <BottomSheet
        open={openCard}
        onDismiss={() => setOpenCard(false)}
        snapPoints={({ maxHeight }) => [
          maxHeight - maxHeight / 5.5,
          maxHeight * 0.9,
        ]}
        className="card-bottom-sheet"
        header={
          <>
            <div className="sheetHeader">Media & Mentions</div>
            <div className="closesheet" onClick={() => setOpenCard(false)}>
              <X />
            </div>
            <div className="goBack mob" onClick={() => setPrevCardOpen()}>
              <ChevronLeft size={20} /> Back
            </div>
          </>
        }
        footer={<div className="sheetFooter">© Pressto Gallery</div>}
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <div className="sheet-gallery-grid">
            <div className="bottom-card">
              {selectedItem && (
                <div className="card-detail">
                  <div className="card-title">
                    <h3>{selectedItem.title}</h3>
                    <p>{selectedItem.description}</p>
                  </div>
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/spotlight/"
                    src={selectedItem.img}
                    alt={selectedItem.title}
                  />                 
                </div>
              )}
            </div>
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
      //data layer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          event: "home_aboutys_know_more_btn_click",
          event_type:"about_us_navigatoin"
      });
      navigate('/about');
  };
  return (
    <section className="section-container luxaryExperience autoSlider mb-120">
      <Heading title="Luxury Experience Indeed" />
      {
        width >=820 ? 
        <div className="luxaryExperience-item">
          <div className="item">
            <Image
              urlEndpoint="https://www.presstoindia.com/media/"
              src="exp-1.jpg"
              alt="Luxury Experience 1"
            />
          </div>
          <div className="item">
            <Image
              urlEndpoint="https://www.presstoindia.com/media/"
              src="exp-2.jpg"
              alt="Luxury Experience 2"
            />
          </div>
          <div className="item collage">
            <div className="image-collage">
              {["exp-3.jpg", "exp-4.jpg", "exp-5.jpg"].map((img, index) => (
                <div className="grid" key={index}>
                  <Image
                      urlEndpoint="https://www.presstoindia.com/media/"
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
                <div className="btn btn-md base-btn outlined overflowHidden" onClick={goToContactPage }>Know More</div>
              </div>
            </div>
          </div>
        </div>
        :
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={28}
            modules={[Pagination]}
            className="slider"
          >
             <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/"
                    src="exp-1.jpg"
                    alt="Luxury Experience 1"
                  />
                </div>
              </SwiperSlide>  
              <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/"
                    src="exp-2.jpg"
                    alt="Luxury Experience 2"
                  />
                </div>
              </SwiperSlide>  
               <SwiperSlide>
                <div className="luxurySlider">                 
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/mobile/"
                    src="service-3.jpg"
                    alt="Luxury Experience 2"
                  />
                </div>
              </SwiperSlide>
               <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/mobile/"
                    src="service-4.jpg"
                    alt="Luxury Experience 2"
                  />
                </div>
              </SwiperSlide>
               <SwiperSlide>
                <div className="luxurySlider">
                  <Image
                    urlEndpoint="https://www.presstoindia.com/media/mobile/"
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
const RealStories = ({reviewRef}) => (
  <section className="section-container realStories mb-120">
    <Heading title="Real Stories, Real Trust" />
    <div className="real-container" ref={reviewRef}>
      <GoogleReviews/>
      <RealSlider />
    </div>
  </section>
);

 const heroImages = [
    { src: "banner.jpeg", title: 'Free Pickup & Drop' },
    { src: "banner-0.jpeg", title: 'Free Pickup & Drop' },
    { src: "banner-1.jpg", title: 'Free Pickup & Drop' },
    { src: "banner-2.jpg", title: 'Free Pickup & Drop' },
    { src: "banner-3.jpg", title: 'Free Pickup & Drop' }
 ];

 const heroImagesMobile = [
    { src: "banner.jpeg", title: 'Free Pickup & Drop' },
    { src: "banner-0.jpeg", title: 'Free Pickup & Drop' },
    { src: "banner-1.jpg", title: 'Free Pickup & Drop' },
    { src: "banner-2.jpg", title: 'Free Pickup & Drop' },
    { src: "banner-3.jpg", title: 'Free Pickup & Drop' }
 ];

 


// Main Home Component
const Home = () => {  
  const { width } = useWindowSize();
  const reviewRef = useRef(null);
  const handleScrollToReview = () => {
    reviewRef.current?.scrollIntoView({ behavior: "smooth" });
    //data layer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "read_review_btn_click",
        event_type:"review_open"
      });
  };
  return (
    <section className="home">
      <Helmet>
        <title>Experience the Best Laundry, Dry Cleaning and Cobbler Services with Pressto India</title>
        <meta
          name="description"
          content="At Pressto, we offer top-notch dry cleaning services to keep your garments as good as new. Trust us to handle all of your cleaning needs with ease."/>
        <meta name="keywords" content=" premium dry cleaning, luxury garment care, expert artisans, soft water cleaning, eco-friendly premium, Mumbai Delhi Bangalore, designer clothes care, pickup delivery, bespoke service, European standards, Pressto India"/>
        <link rel="canonical" href="https://www.presstoindia.com/" />
      </Helmet>
      {
        width >1024 ?<HeroSlider heroImages={heroImages} dir="mainbanner" type="desktop" hideTitleOnFirstSlideDesktop/> :<HeroSlider heroImages={heroImagesMobile} dir="mainbanner" type="mobile"/>
      }      
      
      <Client />
      {
        width <1025 &&  <div className="d-flex justify-center-center align-items-center mt-4 mb-5">
                          <div className="text-uppercase btn-lg rounded-pill py-3 px-4 border border-secondary readReviews" onClick={handleScrollToReview}>Read Reviews <span className="d-inline-block ml-1"><ArrowDown size={20}/></span></div> 
                        </div>
      }
      <SixColumnlayout />
      <div className="slider-mb-168">
        <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" size="small"/>
      </div>
      <SixColumnlayoutCenter image={["service-tshirt.jpg", "service-bag.jpg"]}/>
      <RealStories reviewRef={reviewRef} />
      <SectionSpotlight />
      <div className="slider-mb-168">
        <Prestige title="The Prestige We've Pressed" data={carePartners} size="big"/>
      </div>
      <LuxaryExperience />
      <div className="slider-mb-168">
        <Experties title="Brand Recognition" data={brandRecognition} item="5" size="big"/>   
      </div>   
    </section>
  );
};

export default Home;

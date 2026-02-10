import React from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router';
import { Clock, Mail, Phone, Globe, MapPin } from 'lucide-react';
import "./Contact.scss"; // Assuming you have a CSS file for styling
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import { Image } from '@imagekit/react';
import { openSheet } from '../redux/slices/sideSheetSlice';

//experience
import { Button } from '../components/common/Button';
import Experties from '../components/Experties';

//services 
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';
import ReviewSlider from '../components/ReviewSlider';

//Short Testimonial
const CustomerReviewHighlight = () => {
   const dispatch = useDispatch();
    const handleOpen = () => {
      dispatch(openSheet());
    };
  return (
    <div className="section-container mb-120">
      <div className="customer-highlight">
        {/* Left */}
        <div className="left lg-hide">
          <p className="count"><ScrollAnimatedNumber value={10000} format={{ notation: 'compact' }} />+</p>
          <p className="label">Happiness Delivered</p>
        </div>

        {/* Center */}
        
        <div className="centerSlider">
          <ReviewSlider/>
        </div>

        {/* Right */}
        <div className="right lg-hide sm-show" onClick={handleOpen} style={{cursor:"pointer"}}>
          <div className="avatars">
            <img src="https://i.pravatar.cc/40?img=1" alt="user" />
            <img src="https://i.pravatar.cc/40?img=2" alt="user" />
            <img src="https://i.pravatar.cc/40?img=3" alt="user" />
            <div className="more">+32</div>
          </div>
          <p className="label">Brand Reviews</p>
        </div>
      </div>
    </div>
  );
};

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>Contact Pressto India - Premium Garment Care Specialists | Luxury Service</title>
        <meta name="Contact Pressto India for premium garment care. Call 1800229199 or email pickmeup@presstoindia.com. Luxury service specialists in Mumbai, Delhi & Bangalore."/>
        <meta name="keywords" content="contact Pressto India, premium garment care contact, luxury service specialists, expert customer service, premium pickup booking, luxury dry cleaning contact, high-end garment care, designer clothes care contact"/>
        <link rel="canonical" href="https://www.presstoindia.com/contact" />
      </Helmet>
  )
}
const Contact = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToStoretPage = () => {
      navigate('/store');
  };
  const goToBookNowPage = () => {
     dispatch(setOpenBookNow(true));
  };
  return (
    <div className="contact-page">
      <HelmetMeta />
       <section className="section-container mb-120">
          <div className="contact-us-container">
            <div className="contact-map"> 
              <Image
                urlEndpoint="https://www.presstoindia.com/media/contact/"
                src="contact.jpg"
                width={848}
                height={848}
                alt="Contact Us"
              />
            </div>
            <div className="contact-info">
              <h3>Contact us</h3>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Lower Parel, Mumbai 400013</span>
              </div>

              <div className="contact-item">
                <Clock size={16} />
                <span>10 am to 7 pm</span>
              </div>

              <div className="contact-item">
                <Mail size={16} />
                <Link to="mailto:info@presstoindia.com">info@presstoindia.com</Link>
              </div>

              <div className="contact-item">
                <Phone size={16} />
                <Link to="tel:1800229199">1800229199</Link>
              </div>

               <div className="contact-item whatsapp-icon"
                onClick={() => {
                  const phone = "9167188355";
                  const message = encodeURIComponent("Let's Start!");
                  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
                  window.open(url, "_blank");
                }}               
               >
                
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20.52 3.48A11.82 11.82 0 0012.04 0C5.42 0 .06 5.36.06 11.98c0 2.11.55 4.17 1.6 6L0 24l6.17-1.62a11.9 11.9 0 005.86 1.5h.01c6.62 0 11.98-5.36 11.98-11.98a11.9 11.9 0 00-3.5-8.42z"
                        fill="#25D366"
                      />
                      <path
                        d="M17.34 14.26c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.48-1.75-1.65-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
                        fill="#ffffff"
                      />
                    </svg>
                <span>9167188355</span>
              </div>

              <div className="contact-item">
                <Globe size={16} />
                <Link to="http://www.presstoindia.com" target="_blank" rel="noreferrer">
                  http://www.presstoindia.com
                </Link>
              </div>
            </div>
          </div>
      </section>
      <div className="slider-mb-168">
        <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
      </div>
      <div className="section-container mb-120">
        <Heading title="Experience Pressto" />
        <div className="section-luxaryExperience-item">
          <div className="exp-item">
            <h3 className="mobile-only">Locate Store Near you</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/exp/"
                src="exp-6.jpg"
                width={416}
                height={416}
                alt="exp6"
              />
            </div>
            <div className="exp-content">
              <h3 className="desktop-only">Locate Store Near you</h3>
              <p>Find your nearest Pressto and step into effortless, premium care</p>
               <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToStoretPage}>Find Now</div>
            </div>
          </div>
          <div className="exp-item">
            <h3 className="mobile-only">Pickup & Drop</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://www.presstoindia.com/media/exp/"
                src="exp-7.jpg"
                width={416}
                height={416}
                alt="exp7"
              />
            </div>
            <div className="exp-content">
              <h3 className="desktop-only">Pickup & Drop</h3>
              <p>Schedule a pickup and let premium care come to you.</p>
               <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToBookNowPage}>Book an Appointment</div>
            </div>
          </div>
        </div>
      </div>      
      <SixColumnlayoutCenter image={["whatwedo1.jpg", "whatwedo2.jpg"]} dir="contact"/>

      <CustomerReviewHighlight/>
    </div>
  )
}

export default Contact

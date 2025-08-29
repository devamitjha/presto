import React from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router';
import { Clock, Mail, Phone, Globe } from 'lucide-react';
import "./Contact.scss"; // Assuming you have a CSS file for styling
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import { Image } from '@imagekit/react';

//experience
import { Button } from '../components/common/Button';
import Experties from '../components/Experties';

//services 
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';
import ReviewSlider from '../components/ReviewSlider';

//Short Testimonial
const CustomerReviewHighlight = () => {
  return (
    <div className="section-container">
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
        <div className="right lg-hide sm-show">
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
       <section className="section-container">
          <div className="contact-us-container">
            <div className="contact-map"> 
              <Image
                urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/contact/"
                src="contact.jpg"
                width={848}
                height={848}
                alt="Contact Us"
              />
            </div>
            <div className="contact-info">
              <h3>Contact us</h3>
              <p>
                Press2 Drycleaning & Laundry Pvt. Ltd. Centre Point Condominium, 243 A, N M Joshi Marg, Opp. Bawla Masjid, Lower Parel (E),
                Mumbai - 400013.
              </p>

              <div className="contact-item">
                <Clock size={16} />
                <span>10 am to 7 pm</span>
              </div>

              <div className="contact-item">
                <Mail size={16} />
                <Link to="mailto:pickmeup@presstoindia.com">pickmeup@presstoindia.com</Link>
              </div>

              <div className="contact-item">
                <Phone size={16} />
                <Link to="tel:1800229199">1800229199</Link>
              </div>

              <div className="contact-item">
                <Globe size={16} />
                <Link to="https://www.pressto.com/" target="_blank" rel="noreferrer">
                  https://www.pressto.com/
                </Link>
              </div>
            </div>
          </div>
      </section>
      <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
      <div className="section-container">
        <Heading title="Experience Pressto" />
        <div className="section-luxaryExperience-item">
          <div className="exp-item">
            <h3 className="mobile-only">Locate Store Near you</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
                src="exp-6.jpg"
                width={416}
                height={416}
                alt="exp6"
              />
            </div>
            <div className="exp-content">
              <h3 className="desktop-only">Locate Store Near you</h3>
              <p>Find your nearest Pressto and step into effortless, premium care</p>
               <Button title="Find Now" className="btn btn-md base-btn secondary overflowHidden" GoTo={goToStoretPage}/>
            </div>
          </div>
          <div className="exp-item">
            <h3 className="mobile-only">Pickup & Drop</h3>
            <div className="img-container">
              <Image
                urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
                src="exp-7.jpg"
                width={416}
                height={416}
                alt="exp7"
              />
            </div>
            <div className="exp-content">
              <h3 className="desktop-only">Pickup & Drop</h3>
              <p>Schedule a pickup and let premium care come to you.</p>
               <Button title="Book an Appointment" className="btn btn-md base-btn secondary overflowHidden" GoTo={goToBookNowPage}/>
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

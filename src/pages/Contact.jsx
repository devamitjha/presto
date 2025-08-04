import React from 'react';
import { Helmet } from "react-helmet";
import { Link, useNavigate } from 'react-router';
import { Clock, Mail, Phone, Globe, Star } from 'lucide-react';
import "./Contact.scss"; // Assuming you have a CSS file for styling
import Heading from '../components/common/Heading';
import { expertiseData } from '../api/expertiseData';

//experience
import Exp6 from "../assets/images/exp/exp-6.jpg";
import Exp7 from "../assets/images/exp/exp-7.jpg";
import { Button } from '../components/common/Button';
import Experties from '../components/Experties';

//services 
import whatwedo1 from "../assets/images/contact/whatwedo1.jpg";
import whatwedo2 from "../assets/images/contact/whatwedo2.jpg";
import ContactImage from "../assets/images/contact/contact.jpg"
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';

//Short Testimonial
const CustomerReviewHighlight = () => {
  return (
    <div className="section-container">
      <div className="customer-highlight">
        {/* Left */}
        <div className="left">
          <p className="count"><ScrollAnimatedNumber value={10000} format={{ notation: 'compact' }} />+</p>
          <p className="label">Happiness Delivered</p>
        </div>

        {/* Center */}
        <div className="center">
          <div className="review-card">
            <div className="user-info">
              <img
                src="https://i.pravatar.cc/40?img=65"
                alt="Jemimah Rodrigous"
                className="avatar"
              />
              <div>
                <p className="name">Jemimah Rodrigous</p>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FFC107" color="#FFC107" />
                  ))}
                </div>
              </div>
            </div>
            <p className="date">26th June 2023</p>
          </div>
        </div>

        {/* Right */}
        <div className="right">
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
        <title>Contact Page | Contact Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
  )
}
const Contact = () => {
  const navigate = useNavigate();
  const goToStoretPage = () => {
      navigate('/store');
  };
  const goToBookNowPage = () => {
      navigate('/book-now');
  };
  return (
    <div className="contact-page">
      <HelmetMeta />
       <section className="section-container">
          <div className="contact-us-container">
            <div className="contact-map"> 
              <img src={ContactImage} alt="main banner" width="848" height="848"/>
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
      <SixColumnlayoutCenter image={[whatwedo1, whatwedo2]} />
      <CustomerReviewHighlight/>
    </div>
  )
}

export default Contact

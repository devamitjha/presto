import React from 'react';
import { Helmet } from "react-helmet";
import "./Store.scss";
import StoreLocator from '../components/common/StoreLocator';
import Heading from '../components/common/Heading';
import { Star } from 'lucide-react';

//services 
import serviceTshirt from "../assets/images/service-tshirt.jpg";
import serviceBag from "../assets/images/service-bag.jpg";
import Experties from '../components/Experties';
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import { expertiseData } from '../api/expertiseData';

//Benefits
import StarShine from "../assets/images/star_shine.svg";
import Redeem from "../assets/images/redeem.svg";
import Cleaning from "../assets/images/cleaning.svg";
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';
import StoreList from '../components/StoreLists';

const HelmetMeta = () => {
  return (
    <Helmet>
      <title>Store Page | Store Page</title>
      <meta name="description" content="Learn more about our company and mission." />
      <meta name="keywords" content="about us, company, mission, values" />
      <link rel="canonical" href="https://www.yoursite.com" />
    </Helmet>
  )
};

const items = [
  { img: StarShine, alt: "StarShine", title:"Care that Lasts", lable:"At Pressto, we believe the things you love deserve more time with you. Our garment, shoe, and bag care services focus on restoration, not replacement. From delicate fabrics to well-worn leather, we extend the life of every piece so you can enjoy them for years, not seasons." },
  { img: Redeem, alt: "Redeem", title:"Packaging with Purpose", lable:"Every detail counts - even how your items are returned. Our 100% recyclable and compostable packaging reflects our commitment to reducing waste and embracing circularity, ensuring your clean clothes don’t cost the Earth."},
  { img: Cleaning, alt: "Cleaning" , title:"Cleaning that’s Kinder", lable:"Sustainability isn’t a feature, it’s a foundation. We use advanced technology to minimise water usage, avoid harsh chemicals, and ensure gentle yet effective cleaning. It’s a thoughtful balance of precision and care that protects both your items and the environment."},
];

const Benefits = () => {
  return (
    <section className="section-container">
      <Heading title="When you choose Pressto, you choose…" />
      <div className="you-choose">
          <div className="grid-container">
            {items.map((item, index) => (
              <div className="grid-item" key={index}>
                <div className="item-image">
                  <img src={item.img} alt={item.alt} width="148" height="148"/>
                </div>
                <div className="details">
                  <h4>{item.title}</h4>
                  <p>{item.lable}</p>
                </div>
              </div>
            ))}
          </div>
      </div>      
    </section>
  );
};

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

const Store = () => {
  return (
    <section className="store">
      <HelmetMeta />
      <section className="section-container">  
        <Heading title="Store Locator" />
        <div className="section-tab">
          <p>With a legacy built on precision, care, and innovation, Pressto today operates across 45 locations in 3 major cities. From day one, we’ve led the way in responsible garment care - blending global standards with thoughtful, eco-conscious practices. Because for us, premium isn’t just about how it looks, but how it lasts.</p>          
        </div>
        <StoreLocator/>       
      </section>
      {/* <StoreList/> */}
       <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4"/>
      <SixColumnlayoutCenter image={[serviceTshirt, serviceBag]} />
      <Benefits />
      <CustomerReviewHighlight/>
    </section>
  )
}

export default Store

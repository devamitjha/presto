import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet";
import { NavLink, Outlet, useLocation } from 'react-router';
import HeroSlider from '../components/HeroSlider';
import "./service.scss";

//hero slider
import dc1 from '../assets/images/service/DryCleaning/dc1.jpg';
import dc2 from '../assets/images/service/DryCleaning/dc2.jpg';
import dc3 from '../assets/images/service/DryCleaning/dc3.jpg';
import dc4 from '../assets/images/service/DryCleaning/dc4.jpg';

import res1 from '../assets/images/service/Restoration/res1.jpg';
import res2 from '../assets/images/service/Restoration/res2.jpg';
import res3 from '../assets/images/service/Restoration/res3.jpg';


const HelmetMeta = () => (
  <Helmet>
    <title>Service Page | Service Page</title>
    <meta name="description" content="Learn more about our company and mission." />
    <meta name="keywords" content="about us, company, mission, values" />
    <link rel="canonical" href="https://www.yoursite.com" />
  </Helmet>
);

const dryCleaningSlider = [
    { src: dc1, title: 'Look Good, Feel Great' },
    { src: dc2, title: 'Look Good, Feel Great' },
    { src: dc3, title: 'Look Good, Feel Great' },
    { src: dc4, title: 'Look Good, Feel Great' }
];
const restorationSlider = [
    { src: res1, title: 'Look Good, Feel Great' },
    { src: res2, title: 'Look Good, Feel Great' },
    { src: res3, title: 'Look Good, Feel Great' }
 ];


const ServiceLayout = () => {
  const location = useLocation();
  const dryCleaningRef = useRef(null);
  const restorationRef = useRef(null);
  const [userClickedTab, setUserClickedTab] = useState(false);

  useEffect(() => {
    if (userClickedTab) {
      const timer = setTimeout(() => {
        if (location.pathname.includes('dry-cleaning') && dryCleaningRef.current) {
          dryCleaningRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        } else if (location.pathname.includes('shoes-and-bag-restoration') && restorationRef.current) {
          restorationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
        setUserClickedTab(false);
      },1000); 

      return () => clearTimeout(timer);
    }
  }, [location.pathname, userClickedTab]);

  return (
    <div className="servicePage px-0">
      <HelmetMeta />
      <div className="main-banner">
          {location.pathname.includes('dry-cleaning') && (
            <HeroSlider heroImages={dryCleaningSlider}/>
          )}
          {location.pathname.includes('shoes-and-bag-restoration') && (
            <HeroSlider heroImages={restorationSlider}/>
        )}   
      </div>
      <div className="service-tab">
        <NavLink
          ref={dryCleaningRef}
          className="btn btn-md base-btn outlined overflowHidden"
          to="/service/dry-cleaning"
          onClick={() => setUserClickedTab(true)}
        >
          Laundry & Dry Cleaning
        </NavLink>
        <NavLink
          ref={restorationRef}
          className="btn btn-md base-btn outlined overflowHidden"
          to="/service/shoes-and-bag-restoration"
          onClick={() => setUserClickedTab(true)}
        >
          Shoes & Bag Restoration
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default ServiceLayout;

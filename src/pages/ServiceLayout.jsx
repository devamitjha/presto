import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router';
import useWindowSize from '../hooks/useWindowSize';
import HeroSlider from '../components/HeroSlider';
import "./service.scss";


const dryCleaningSlider = [
    { src: "dc00.jpg", title: 'Free Pickup & Drop' },
    { src: "dc01.jpg", title: 'Free Pickup & Drop' }
];
const dryCleaningSliderMobile = [
    { src: "dc00.jpg", title: 'Free Pickup & Drop' },
    { src: "dc01.jpg", title: 'Free Pickup & Drop' }
];

const restorationSlider = [
    { src: "res1.jpg", title: 'Free Pickup & Drop' },
    { src: "res2.jpg", title: 'Free Pickup & Drop' },
    { src: "res3.jpg", title: 'Free Pickup & Drop' }
 ];

 const restorationSliderMobile = [
    { src: "res1.jpg", title: 'Free Pickup & Drop' },
    { src: "res2.jpg", title: 'Free Pickup & Drop' },
 ];


const ServiceLayout = () => {
  const { width } = useWindowSize();
  const location = useLocation();
  const dryCleaningRef = useRef(null);
  const restorationRef = useRef(null);
  const [userClickedTab, setUserClickedTab] = useState(false);

  useEffect(() => {
    if (userClickedTab) {
      const timer = setTimeout(() => {
        if (location.pathname.includes('dry-cleaning') && dryCleaningRef.current) {
          dryCleaningRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        } else if (location.pathname.includes('shoes-and-bag-care') && restorationRef.current) {
          restorationRef.current.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }
        setUserClickedTab(false);
      },1000); 

      return () => clearTimeout(timer);
    }
  }, [location.pathname, userClickedTab]);

  return (
    <div className="servicePage px-0">
      <div className="main-banner">
          {location.pathname.includes('dry-cleaning') && (
            width >1024 ?<HeroSlider heroImages={dryCleaningSlider} dir="service/DryCleaning" type="desktop" title="Free Pickup & Drop"/> :<HeroSlider heroImages={dryCleaningSliderMobile} dir="service/DryCleaning" type="mobile" title="Free Pickup & Drop"/>
          )}
          {location.pathname.includes('shoes-and-bag-care') && (
            width >1024 ?<HeroSlider heroImages={restorationSlider} dir="service/Restoration" type="desktop" title="Free Pickup & Drop"/> :<HeroSlider heroImages={restorationSliderMobile} dir="service/Restoration" type="mobile" title="Free Pickup & Drop"/>
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
          to="/service/shoes-and-bag-care"
          onClick={() => setUserClickedTab(true)}
        >
          Shoe & Bag Care
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default ServiceLayout;

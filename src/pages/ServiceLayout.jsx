import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet";
import { NavLink, Outlet, useLocation } from 'react-router';
import DryCleaning from "../assets/images/service/dry-Cleaning.jpg";
import Restoration from "../assets/images/service/restoration.jpg";
import "./service.scss";

const HelmetMeta = () => (
  <Helmet>
    <title>Service Page | Service Page</title>
    <meta name="description" content="Learn more about our company and mission." />
    <meta name="keywords" content="about us, company, mission, values" />
    <link rel="canonical" href="https://www.yoursite.com" />
  </Helmet>
);

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
            <img src={DryCleaning} alt="DryCleaning" width="1872" height="936" />
          )}

          {location.pathname.includes('shoes-and-bag-restoration') && (
            <img src={Restoration} alt="Restoration" width="1872" height="936" />
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

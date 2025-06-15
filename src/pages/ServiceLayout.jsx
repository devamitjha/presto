import React from 'react';
import { Helmet } from "react-helmet";
import { Outlet, useNavigate } from 'react-router';
import ServiceBanner from "../assets/images/service-main.jpg";
import "./service.scss";

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>Service Page | Service Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
  )
}


const ServiceLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="servicePage">
      <HelmetMeta/>
      <div className="main-banner">
        <img  src={ServiceBanner} alt="Service" width="1872" height="936" />
      </div>
      <div className="service-tab">
          <div  className="btn btn-md base-btn secondary overflowHidden" onClick={() => navigate('/service/dry-cleaning')}>Laundry & Dry Cleaning</div>
          <div className="btn btn-md base-btn outlined overflowHidden" onClick={() => navigate('/service/shoes-and-bag-restoration')}>Shoes & Bag Restoration</div>
      </div>
      <Outlet/>
    </div>
  )
}

export default ServiceLayout

import React from 'react';
import { Helmet } from "react-helmet";

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
  return (
    <div>
      <HelmetMeta/>
      Contact
    </div>
  )
}

export default Contact

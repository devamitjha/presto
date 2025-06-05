import React from 'react';
import { Helmet } from "react-helmet";

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>About Page | About Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
  )
}

const About = () => {
  return (
    <div>
       <HelmetMeta/>
      About
    </div>
  )
}

export default About

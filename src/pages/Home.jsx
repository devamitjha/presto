import React from 'react'
import { Helmet } from "react-helmet";
import HeroSlider from "../components/HeroSlider";
import "./Home.scss";
import Client from '../components/Client';
import SixColumnlayout from '../components/SixColumnlayout';
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import Experties from '../components/Experties';


const Home = () => {
  return (
    <section className="home">
      <Helmet>
        <title>Home Page | Home Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
      <HeroSlider />
      <Client />
      <SixColumnlayout />
      <Experties/>
      <SixColumnlayoutCenter/>
    </section>
  )
}

export default Home

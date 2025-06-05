import React from 'react'
import { Helmet } from "react-helmet";
import HeroSlider from "../components/HeroSlider";
import "./Home.scss";
import Client from '../components/Client';


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
      <Client/>
    </section>
  )
}

export default Home

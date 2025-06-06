import React from 'react'
import Slider from "react-slick";
import Heading from './common/Heading';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Experties.scss";
import cheer from "../assets/images/cheer.svg";
import diversity from "../assets/images/diversity.svg";
import waterDrop from "../assets/images/water_drop.svg";
import adsClick from "../assets/images/ads_click.svg";
import cycle from "../assets/images/cycle.svg";
import stars from "../assets/images/stars.svg";

const Experties = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1
    };
  return (
      <section className="section-experties">
          <Heading title="Timeless Care, Unmatched Expertise" />
          <div className="section-container">
              <div className="slider-container experties-slider">
                <Slider {...settings}>
                    <div className="item">
                        <div className="image-conteiner"><img src={cheer} width="120px" height="120px" alt="cheet" /></div>
                        <div className="slider-content">
                            <div className="slider-title">Care Beyond Clean</div>
                            <div className="slider-text">Every garment is entrusted to our artisans, whose expertise ensures impeccable results, time and again.</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-conteiner"><img src={diversity} width="120px" height="120px" alt="cheet" /></div>
                        <div className="slider-content">
                            <div className="slider-title">Bespoke Service</div>
                            <div className="slider-text">An experience curated exclusively for you, where each detail of your wardrobe receives the attention it deserves.</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-conteiner"><img src={waterDrop} width="120px" height="120px" alt="cheet" /></div>
                        <div className="slider-content">
                            <div className="slider-title">Purity in Every Drop</div>
                            <div className="slider-text">We use only the finest soft water, preserving the delicate nature of your fabrics while enhancing their longevity.</div>
                        </div>
                    </div>
                    <div className="item"> 
                        <div className="image-conteiner"><img src={adsClick} width="120px" height="120px" alt="cheet" /></div>
                        <div className="slider-content">
                            <div className="slider-title">Cutting-Edge Technology</div>
                            <div className="slider-text">Our advanced, precision-engineered machines ensure your garments are cared for with unrivaled perfection.</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-conteiner"><img src={cycle} width="120px" height="120px" alt="cheet" /></div>
                        <div className="slider-content">
                            <div className="slider-title">Biodegradable Packaging</div>
                            <div className="slider-text">We embrace biodegradable packaging, ensuring your garments are delivered with elegance while protecting the environment.</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="image-conteiner"><img src={stars} width="120px" height="120px" alt="cheet" /></div>
                        <div className="slider-content">
                            <div className="slider-title">Sustainable Luxury</div>
                            <div className="slider-text">We are devoted to sustainability, harmonizing premium care with environmental responsibility in every facet of our service.</div>
                        </div>
                    </div>
                </Slider>
              </div>
          </div>
    </section>
  )
}

export default Experties

import React from 'react';
import Slider from 'react-slick';
import Heading from './common/Heading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Experties.scss';

import cheer from '../assets/images/cheer.svg';
import diversity from '../assets/images/diversity.svg';
import waterDrop from '../assets/images/water_drop.svg';
import adsClick from '../assets/images/ads_click.svg';
import cycle from '../assets/images/cycle.svg';
import stars from '../assets/images/stars.svg';

const expertiseData = [
  {
    image: cheer,
    title: 'Care Beyond Clean',
    text: 'Every garment is entrusted to our artisans, whose expertise ensures impeccable results, time and again.',
    alt: 'Care Beyond Clean Icon'
  },
  {
    image: diversity,
    title: 'Bespoke Service',
    text: 'An experience curated exclusively for you, where each detail of your wardrobe receives the attention it deserves.',
    alt: 'Bespoke Service Icon'
  },
  {
    image: waterDrop,
    title: 'Purity in Every Drop',
    text: 'We use only the finest soft water, preserving the delicate nature of your fabrics while enhancing their longevity.',
    alt: 'Purity Icon'
  },
  {
    image: adsClick,
    title: 'Cutting-Edge Technology',
    text: 'Our advanced, precision-engineered machines ensure your garments are cared for with unrivaled perfection.',
    alt: 'Technology Icon'
  },
  {
    image: cycle,
    title: 'Biodegradable Packaging',
    text: 'We embrace biodegradable packaging, ensuring your garments are delivered with elegance while protecting the environment.',
    alt: 'Eco-Friendly Packaging Icon'
  },
  {
    image: stars,
    title: 'Sustainable Luxury',
    text: 'We are devoted to sustainability, harmonizing premium care with environmental responsibility in every facet of our service.',
    alt: 'Sustainability Icon'
  }
];

const Experties = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  return (
    <section className="section-experties">
      <Heading title="Timeless Care, Unmatched Expertise" />
      <div className="section-container">
        <div className="slider-container experties-slider">
          <Slider {...settings}>
            {expertiseData.map((item, index) => (
              <div className="item" key={index}>
                <div className="image-conteiner">
                  <img src={item.image} width="120px" height="120px" alt={item.alt} />
                </div>
                <div className="slider-content">
                  <div className="slider-title">{item.title}</div>
                  <div className="slider-text">{item.text}</div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Experties;

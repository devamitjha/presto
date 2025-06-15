import React from 'react';
import Slider from 'react-slick';
import Heading from './common/Heading';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Experties.scss';
import { ChevronRight, ChevronLeft } from 'lucide-react';




function NavNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navNext"
      onClick={onClick}
    > <ChevronRight /></div>
  );
}

function NavPrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navPrev"
      onClick={onClick}
    ><ChevronLeft /></div>
  );
}


const Experties = ({ title, data = [], item }) => {
  const slidesToShow = parseInt(item);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />,
    responsive: [
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: slidesToShow ==5 ? 4 : 3,
        }
      }
    ]
  };

  return (
    <section className="section-experties">
      <Heading title={title} />
      <div className="section-container">
        <div className="slider-container experties-slider">
          <Slider {...settings}>
            {data.map((item, index) => (
              <div className="item" key={index}>
                <div className="image-conteiner">
                  <img src={item.image} width="120px" height="120px" alt={item.alt} />
                </div>
                {
                  item.title && <div className="slider-content">
                  <div className="slider-title">{item.title}</div>
                  <div className="slider-text">{item.text}</div>
                </div>
                }
                
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Experties;

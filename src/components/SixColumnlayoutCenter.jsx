import React from 'react';
import "./SixColumnLayout.scss";
import Heading from './common/Heading';
import StaggerOnView from "../components/common/StaggerOnView"
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import { Image } from '@imagekit/react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination } from 'swiper/modules';

import useWindowSize from '../hooks/useWindowSize';


const SixColumnlayoutCenter = ({ image, dir }) => {
    const { width } = useWindowSize();
    const dispatch = useDispatch();
    const goToBookNowPage = () => {
        dispatch(setOpenBookNow(true));
    };
    
  return (
    <section className="section-container six-columns center autoSlider mb-120">
          <Heading title="What we do best" /> 
          {
             width >825 ?
               <StaggerOnView className="row">
                  <div className="item">
                    <Image
                        urlEndpoint={`https://ik.imagekit.io/trozsbxte/pressto/${dir ? `${dir}/` : ''}`}
                        src={`${image[0]}`}
                        width={848}
                        height={848}
                        alt="Drycleaning & Laundry"
                />
                      <div className="title-container">
                          <h4>Drycleaning & Laundry</h4>
                          <p>Combined with exquisite care & advanced technology to deliver perfection.</p>
                          <div className="btn btn-md base-btn outlined overflowHidden" onClick={goToBookNowPage }>Book Now</div>
                      </div>
                  </div>
                  <div className="item">
                        <Image
                            urlEndpoint={`https://ik.imagekit.io/trozsbxte/pressto/${dir ? `${dir}/` : ''}`}
                            src={`${image[1]}`}
                            width={848}
                            height={848}
                            alt="Shoe & Bag Care"
                        />
                      <div className="title-container black">
                          <h4>Shoe & Bag Care</h4>
                          <p>Restoring your shoes and bags with unrivaled precision</p>
                          <div className="btn btn-md base-btn outlined overflowHidden" onClick={goToBookNowPage }>Book Now</div>
                      </div>
                  </div>
              </StaggerOnView>
             :
             <Swiper
                slidesPerView={'auto'}
                spaceBetween={28}
                modules={[Pagination]}
                className="slider"
              >
                <SwiperSlide>
                      <div className="item mobile-width">
                        <Image
                            urlEndpoint={`https://ik.imagekit.io/trozsbxte/pressto/${dir ? `${dir}/` : ''}`}
                            src={`${image[0]}`}
                            width={848}
                            height={848}
                            alt="Drycleaning & Laundry"
                        />
                          <div className="title-container">
                              <h4>Drycleaning & Laundry</h4>
                              <p>Combined with exquisite care & advanced technology to deliver perfection.</p>
                              <div className="btn btn-md base-btn outlined overflowHidden" onClick={goToBookNowPage }>Book Now</div>
                          </div>
                      </div>
                  </SwiperSlide>  
                  <SwiperSlide>                     
                      <div className="item mobile-width">
                          <Image
                              urlEndpoint={`https://ik.imagekit.io/trozsbxte/pressto/${dir ? `${dir}/` : ''}`}
                              src={`${image[1]}`}
                              width={848}
                              height={848}
                              alt="Shoe & Bag Care"
                          />
                        <div className="title-container black">
                            <h4>Shoe & Bag Care</h4>
                            <p>Restoring your shoes and bags with unrivaled precision</p>
                            <div className="btn btn-md base-btn outlined overflowHidden" onClick={goToBookNowPage }>Book Now</div>
                        </div>
                      </div>
                  </SwiperSlide>              
              </Swiper>
          }
         
          
    </section>
  )
}

export default SixColumnlayoutCenter

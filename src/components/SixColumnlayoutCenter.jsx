import React from 'react';
import "./SixColumnLayout.scss";
import Heading from './common/Heading';

import { Button } from "./common/Button";
import StaggerOnView from "../components/common/StaggerOnView"
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import { Image } from '@imagekit/react';


const SixColumnlayoutCenter = ({ image, dir }) => {
    const dispatch = useDispatch();
    const goToBookNowPage = () => {
        dispatch(setOpenBookNow(true));
    };
  return (
    <section className="section-container six-columns center">
          <Heading title="What we do best" />
          <StaggerOnView className="row">
              <div className="item">
                <Image
                    urlEndpoint={`https://ik.imagekit.io/pressto/images/${dir ? `${dir}/` : ''}`}
                    src={`${image[0]}`}
                    width={848}
                    height={848}
                    alt="Drycleaning & Laundry"
                />
                  <div className="title-container">
                      <h4>Drycleaning & Laundry</h4>
                      <p>Combined with exquisite care & advanced technology to deliver perfection.</p>
                      <Button title="Book Now" className="btn btn-md base-btn outlined overflowHidden" GoTo={goToBookNowPage }/>
                  </div>
              </div>
              <div className="item">
                    <Image
                        urlEndpoint={`https://ik.imagekit.io/pressto/images/${dir ? `${dir}/` : ''}`}
                        src={`${image[1]}`}
                        width={848}
                        height={848}
                        alt="Shoe & Bag Care"
                    />
                  <div className="title-container black">
                      <h4>Shoe & Bag Care</h4>
                      <p>Restoring your shoes and bags with unrivaled precision</p>
                       <Button title="Book Now" className="btn btn-md base-btn outlined overflowHidden" GoTo={goToBookNowPage }/>
                  </div>
              </div>
          </StaggerOnView>
    </section>
  )
}

export default SixColumnlayoutCenter

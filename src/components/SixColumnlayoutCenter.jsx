import React from 'react';
import "./SixColumnLayout.scss";
import Heading from './common/Heading';

import { Button } from "./common/Button";


const SixColumnlayoutCenter = ({image}) => {
  return (
    <section className="section-container six-columns center">
          <Heading title="What we do best" />
          <div className="row">
              <div className="item">
                  <img src={image[0]}  width="512px" heigh="590px" alt="service tshirt" />
                  <div className="title-container">
                      <h4>Premium Dry Cleaning & Laundry</h4>
                      <p>Combined with exquisite care & advanced technology to deliver perfection.</p>
                      <Button title="Book Now" className="btn btn-md base-btn outlined overflowHidden" />
                  </div>
              </div>
              <div className="item">
                  <img src={image[1]}  width="864px" heigh="864px" alt="services bag" />
                  <div className="title-container black">
                      <h4>Bag & Shoe Care</h4>
                      <p>Restoring your shoes and bags with unrivaled precision</p>
                       <Button title="Book Now" className="btn btn-md base-btn outlined overflowHidden" />
                  </div>
              </div>
          </div>
    </section>
  )
}

export default SixColumnlayoutCenter

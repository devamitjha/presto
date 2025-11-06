import React, { useState } from 'react';
import "./Client.scss"
import TrustBadge from './common/TrustBadge';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';
import Marquee from "react-fast-marquee";
import useWindowSize from '../hooks/useWindowSize';


const Client = () => {
  const { width } = useWindowSize();
    const [counts] = useState({
        countries: 30,
        stores: 300,
        customers: 100000,
    });
  return (
    <section className="clients">
   
      {
         width >=1024 ? 
          <div className="client my-88">
            <div className="item">
              <h4>
                <ScrollAnimatedNumber value={counts.countries} />+
              </h4>
              <span>Countries</span>
            </div>
            <div className="item">
              <h4>
                <ScrollAnimatedNumber value={counts.stores} format={{ notation: 'compact' }} />+
              </h4>
              <span>Stores</span>
            </div>
            <div className="item">
              <h4>
                <ScrollAnimatedNumber value={counts.customers} format={{ notation: 'compact' }} />+
              </h4>
              <span>Delighted Customers</span>
            </div>
            <div className="item">
              <TrustBadge />
            </div>
          </div>
         :     
         <div className="marquee-container">    
          <Marquee gradient={true} gradientWidth={30}>   
            <div className="item">
              <h4>
                30+
              </h4>
              <span>Countries</span>
            </div>
            <div className="item">
              <h4>
                300+
              </h4>
              <span>Stores</span>
            </div>
            <div className="item">
              <h4>
                100K+
              </h4>
              <span>Delighted Customers</span>
            </div>
            <div className="item">
              <TrustBadge />
            </div>
          </Marquee>
          </div> 
          
     
      }
     </section>
   
  )
}

export default Client

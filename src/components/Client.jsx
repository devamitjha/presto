import React, { useState } from 'react';
import "./Client.scss"
import TrustBadge from './common/TrustBadge';
import ScrollAnimatedNumber from '../hooks/ScrollAnimatedNumber';


const Client = () => {
    const [counts] = useState({
        countries: 30,
        stores: 300,
        customers: 100000,
    });
  return (
    <section className="client">
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
    </section>
  )
}

export default Client

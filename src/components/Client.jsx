import React from 'react';
import "./Client.scss"
import TrustBadge from './common/TrustBadge';

const Client = () => {
  return (
    <section className="client">
        <div className="item">
            <h4>30</h4>
            <span>Countries</span>
        </div>
        <div className="item">
            <h4>300+</h4>
            <span>Stores</span>
        </div>
        <div className="item">
            <h4>100000+</h4>
            <span>Delighted Customers</span>
        </div>
        <div className="item">
            <TrustBadge />
        </div>
    </section>
  )
}

export default Client

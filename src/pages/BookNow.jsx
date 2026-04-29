// src/pages/BookNow.jsx
import React, { useEffect } from 'react';
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Shirt } from 'lucide-react';
import { setOpenBookNow } from '../redux/slices/sheetSlice';
import { setCustomer } from '../redux/slices/customerSlice';
import config from '../config/env';
import "./BookNow.scss";
import Experties from '../components/Experties';
import { expertiseData } from '../api/expertiseData';
import Heading from '../components/common/Heading';
import Exp6 from "../assets/images/exp/exp-6.jpg";
import Exp7 from "../assets/images/exp/exp-7.jpg";

const { siteApiBaseUrl } = config;

const HelmetMeta = () => (
  <Helmet>
    <title>Book Now | Schedule Pickup & Delivery | Pressto India</title>
    <meta name="description" content="Book Pressto laundry, dry cleaning and shoe care services. Schedule free pickup and delivery at your convenience across India." />
    <meta name="keywords" content="book Pressto, schedule pickup, dry cleaning pickup, laundry delivery, Pressto India" />
    <link rel="canonical" href="https://www.presstoindia.com/book-now" />
  </Helmet>
);

const BookNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state) => state.customer.customer);
  
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        if (customer?.customerUniqueId) {
          const response = await fetch(
            `${siteApiBaseUrl}/authApi.php?action=customerDetails&CustomerUniqueId=${encodeURIComponent(customer.customerUniqueId)}`
          );
          const data = await response.json();
          if (data && !data.error) {
            dispatch(setCustomer({
              ...customer,
              ...data,
              walletBalance: data.walletBalance || 0,
              dueAmount: data.dueAmount || 0,
              orderHistory: data.orderHistory || []
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    if (customer) {
      fetchCustomerDetails();
    }
  }, [customer?.customerUniqueId, dispatch]);

  const goToStoretPage = () => navigate('/store');
  const openPickupSheet = () => dispatch(setOpenBookNow(true));

  return (
    <div className="book-now-page mt-5">
      <HelmetMeta />
      <div className="section-container">
        <Heading title="BOOK SERVICE" />
        <div className="book-now-dashboard">
          
          {/* Action Buttons at the Top */}
          <div className="action-buttons">
            <button className="btn-action schedule-pickup" onClick={openPickupSheet}>
              SCHEDULE PICKUP
            </button>
            <button className="btn-action rate-card">
              RATE CARD
            </button>
          </div>

          {/* Dashboard Cards (Logged In) */}
          {customer && (
            <>
              <div className="dashboard-cards">
                <div className="card wallet-card">
                  <h3>PRESSTO WALLET</h3>
                  <div className="card-content">
                    <span className="label">Available Balance</span>
                    <span className="value">₹{customer.walletBalance || 0}</span>
                  </div>
                </div>
                <div className="card due-card">
                  <h3>DUE</h3>
                  <div className="card-content">
                    <span className="label">&nbsp;</span>
                    <span className="value">₹{customer.dueAmount || 0}</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="recent-orders">
                <h2>Recent Orders</h2>
                {customer.orderHistory && customer.orderHistory.length > 0 ? (
                  customer.orderHistory.slice(0, 3).map((order, index) => (
                    <div className="order-item" key={index}>
                      <div className="order-icon">
                        <Shirt size={24} color="#000" />
                      </div>
                      <div className="order-details">
                        <div className="order-header">
                          <span className="order-id">#{order.orderId}</span>
                          <span className="order-date">Placed on {new Date(order.orderDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</span>
                        </div>
                        <div className="order-info">
                          <span className="payment-mode">Payment Mode : {order.paymentMode || 'Cash / Card / UPI'}</span>
                          <span className="order-amount">₹{order.orderAmount}</span>
                        </div>
                        <div className="order-footer">
                          <span className="order-qty">qty : {order.numberOfItems || 0}</span>
                          <div className="order-status-pill">
                            <span className="status-badge">{order.orderStatus || 'Pick up'}</span>
                            <span className="time-slot">{order.pickupTime || '09:00 AM - 10:00AM'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p style={{textAlign: 'center'}}>No recent orders found.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Existing expertise and experience sections */}
        <div style={{marginTop: '5rem', marginBottom: '5rem'}}>
          <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
        </div>
        
        <div className="section-container service-container" style={{marginBottom: '7rem'}}>
          <Heading title="Experience Pressto" />
          <div className="section-luxaryExperience-item">
            <div className="exp-item">
              <div className="img-container">
                <img src={Exp6} alt="exp6" width="416" height="416" />
              </div>
              <div className="exp-content">
                <h3>Locate Store Near you</h3>
                <p>Find your nearest Pressto and step into effortless, premium care</p>
                <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToStoretPage}>Find Now</div>
              </div>
            </div>
            <div className="exp-item">
              <div className="img-container">
                <img src={Exp7} alt="exp7" width="416" height="416" />
              </div>
              <div className="exp-content">
                <h3>Pickup & Drop</h3>
                <p>Schedule a pickup and let premium care come to you.</p>
                <div className="btn btn-md base-btn secondary overflowHidden" onClick={openPickupSheet}>Book an Appointment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;

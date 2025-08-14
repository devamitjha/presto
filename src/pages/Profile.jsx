import React, { useEffect } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../redux/slices/customerSlice"; // adjust path
import { getCustomerDetailsById } from "../services/userServices"; // adjust path
import HistoryIcon from "../assets/images/history.svg"
import Tabs from 'rc-tabs';
import 'rc-tabs/assets/index.css';

const ProfileData = ({ customer }) => {
  console.log(customer);  
  return customer ? (
    <div className="profile-data">
      <div className="bio">
        <h3>Personal Details</h3>
        <div className="info">
          <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
          {customer.email && <p><strong>Email:</strong> {customer.email}</p>}
          <p><strong>Mobile:</strong> {customer.mobile}</p>  
        </div>
      </div>
      <div className="bio">
        <h3>Address Book</h3>
        <div className="info">
          <p><strong>Name:</strong> {customer.firstName} {customer.lastName}</p>
          <p><strong>Address:</strong> {customer.address}</p>  
        </div>
      </div>
    </div>
  ) : (
    <p>Loading customer details...</p>
  );
};

const OrderHistory = ({ customer }) => {
  return customer ? (
    <div className="order-history-list">
      {customer.orderHistory.map((item) => (
        <div key={item.orderId} className="order-history">
          <div className="history-icon">
            <img src={HistoryIcon} alt="history" />
          </div>
          <div className="order-detail">
            <p>
              <span className="dark">Order: {item.orderId}</span>
              <span>Placed on {new Date(item.orderDate).toLocaleDateString()}</span>
            </p>
            <p>
              <span>Payment Mode: {item.paymentMode}</span>
              <span className="dark">Order Amount: ₹{item.orderAmount}</span>
            </p>
            <p>
              <span>No of Items: {item.numberOfItems}</span>
              <span>Status: {item.orderStatus}</span>
            </p>
            <p>
              <span>Expected Delivery Date: {new Date(item.expectedDeliveryDate).toLocaleDateString()}</span>
              <span>Actual Delivery Date: {new Date(item.actualDeliveryDate).toLocaleDateString()}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p>Loading customer order...</p>
  );
};



export default function Profile() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);
  const items = [
  { key: '1', label: 'Profile', children:<ProfileData customer={customer}/> },
  { key: '2', label: 'Order History', children: <OrderHistory customer={customer}/> },
];

useEffect(() => {
  const fetchCustomerDetails = async () => {
    try {
      if (customer?.customerUniqueId) {
        const response = await fetch(
          `https://www.presstoindia.com/authApi.php?action=customerDetails&CustomerUniqueId=${encodeURIComponent(customer.customerUniqueId)}`
        );

        const data = await response.json();
        console.log(data);

        if (data && !data.error) {
          dispatch(setCustomer(data)); // store in Redux & localStorage
        } else {
          console.error("Error from API:", data.error || "Unknown error");
        }
      }
    } catch (error) {
      console.error("Error fetching customer details:", error);
    }
  };

  fetchCustomerDetails();
}, [customer?.customerUniqueId, dispatch]);


  // useEffect(() => {
  //   const fetchCustomerDetails = async () => {
  //     try {
  //       if (customer?.customerUniqueId) {
  //         const response = await getCustomerDetailsById(customer.customerUniqueId);
  //         console.log(response);

  //         if (response.data) {
  //           dispatch(setCustomer(response.data)); // store in Redux & localStorage
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error fetching customer details:", error);
  //     }
  //   };

  //   fetchCustomerDetails();
  // }, [customer?.customerUniqueId, dispatch]);

  return (     
      <div className="profile-container">
        <div className="title">My Account</div>
        <Tabs
          items={items}
          defaultActiveKey="1"
          tabPosition="top"
          tabBarGutter={32}
          onChange={(key) => console.log('Tab switched to:', key)}
          animated={{ inkBar: true, tabPane: false }}
          className="test"
        />
      </div>
  );
}

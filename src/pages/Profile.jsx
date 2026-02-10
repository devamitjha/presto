import React, { useEffect } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../redux/slices/customerSlice";
import HistoryIcon from "../assets/images/history.svg"
import Tabs from 'rc-tabs';
import 'rc-tabs/assets/index.css';

const ProfileData = ({ customer }) => {
  if (!customer) {
    return <p>Loading customer details...</p>;
  }

  const {
    firstName,
    lastName,
    email,
    mobile,
    address,
  } = customer;

  return (
    <div className="profile-data">
      {/* ================= Personal Details ================= */}
      <div className="bio">
        <h3>Personal Details</h3>
        <div className="info">
          <p>
            <strong>Name:</strong> {firstName} {lastName}
          </p>

          {email && (
            <p>
              <strong>Email:</strong> {email}
            </p>
          )}

          <p>
            <strong>Mobile:</strong> {mobile}
          </p>
        </div>
      </div>

      {/* ================= Address Book ================= */}
      <div className="bio">
        <h3>Address Book</h3>
        <div className="info">
          <p>
            <strong>Name:</strong> {firstName} {lastName}
          </p>

          <p>
            <strong>Address:</strong> {address || "—"}
          </p>
        </div>
      </div>
    </div>
  );
};


const OrderHistory = ({ customer }) => {
  if (!customer) {
    return <p>Loading customer order...</p>;
  }

  if (!customer.orderHistory || customer.orderHistory.length === 0) {
    return <p>No orders found.</p>;
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "—";

  return (
    <div className="order-history-list">
      {customer.orderHistory.map((item) => (
        <div
          key={item.orderId ?? `${item.orderDate}-${item.orderAmount}`}
          className="order-history"
        >
          <div className="history-icon">
            <img src={HistoryIcon} alt="Order history" />
          </div>

          <div className="order-detail">
            <p>
              <span className="dark">
                <strong>Order:</strong> {item.orderId}
              </span>
              <span>
                <strong>Placed on:</strong> {formatDate(item.orderDate)}
              </span>
            </p>

            <p>
              <span>
                <strong>Payment Mode:</strong> {item.paymentMode}
              </span>
              <span className="dark">
                <strong>Order Amount:</strong> ₹{item.orderAmount}
              </span>
            </p>

            <p>
              <span>
                <strong>No of Items:</strong> {item.numberOfItems}
              </span>
              <span>
                <strong>Status:</strong> {item.orderStatus}
              </span>
            </p>

            <p>
              <span>
                <strong>Expected Delivery Date:</strong>{" "}
                {formatDate(item.expectedDeliveryDate)}
              </span>
              <span className="text-right">
                <strong>Actual Delivery Date:</strong>{" "}
                {formatDate(item.actualDeliveryDate)}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
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
          `https://www.presstoindia.com/api/authApi.php?action=customerDetails&CustomerUniqueId=${encodeURIComponent(customer.customerUniqueId)}`
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

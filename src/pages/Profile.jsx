import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../redux/slices/customerSlice";
import config from "../config/env";
import HistoryIcon from "../assets/images/history.svg"
import { useLocation, useNavigate } from "react-router";
import { ClipboardList, Package } from "lucide-react";
import { setOpenRecharge } from "../redux/slices/sheetSlice";

const { siteApiBaseUrl } = config;

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

const Wallet = ({ customer, transactions, loading }) => {
  const dispatch = useDispatch();
  if (!customer) {
    return <p>Loading wallet details...</p>;
  }

  const walletBalance = customer.walletBalance || 0;

  const formatDate = (date) => {
    if (!date) return "—";
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  return (
    <div className="wallet-view">
      {/* Balance Card */}
      <div className="balance-card">
        <h3>PRESSTO WALLET</h3>
        <div className="balance-amount">
          <span>Available Balance</span>
          <strong>₹{walletBalance}</strong>
        </div>
        
        {walletBalance === 0 && (
          <button 
            className="recharge-btn-inline"
            onClick={() => dispatch(setOpenRecharge(true))}
          >
            Recharge Wallet
          </button>
        )}

        <p className="balance-note">
          Pressto wallet could be used completely on any order, your redeemed coupons benefits are added here.
        </p>
      </div>

      {/* Transaction History Section */}
      <div className="transaction-section">
        <div className="transaction-header">
          <div className="active-tab">
             <ClipboardList size={18} />
             <span>Transaction history</span>
          </div>
        </div>
        
        <p className="tap-hint">Tap on a transaction to see more details</p>

        <div className="transaction-list">
          {loading ? (
            <p style={{ textAlign: 'center', padding: '20px' }}>Loading transactions...</p>
          ) : transactions && transactions.length > 0 ? (
            transactions.map((tx, index) => {
              const isDebit = tx.transactionType?.toLowerCase() === 'redeem';
              return (
                <div key={index} className="transaction-item">
                  <div className="tx-icon">
                    <img src={HistoryIcon} alt="Transaction" style={{ width: '24px' }} />
                  </div>
                  <div className="tx-details">
                    <div className="tx-main">
                      <span className="tx-title">{isDebit ? `Paid for Order #${tx.orderId || '—'}` : `Recharge Wallet`}</span>
                      <span className={`tx-amount ${isDebit ? 'negative' : 'positive'}`}>
                        {isDebit ? '-' : '+'} ₹{tx.amount}
                      </span>
                    </div>
                    <span className="tx-date">
                      {isDebit ? 'Used on' : 'Added on'} {formatDate(tx.createdOn)}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
             <p style={{ textAlign: 'center', padding: '20px', color: '#8a8fb5' }}>No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Profile() {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");

  const [activeTab, setActiveTab] = useState("profile");
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  useEffect(() => {
    if (tabParam === "orders") {
      setActiveTab("orders");
    } else if (tabParam === "wallet") {
      setActiveTab("wallet");
    } else {
      setActiveTab("profile");
    }
  }, [tabParam]);

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        if (customer?.customerUniqueId) {
          const response = await fetch(
            `${siteApiBaseUrl}/authApi.php?action=customerDetails&CustomerUniqueId=${encodeURIComponent(customer.customerUniqueId)}`
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

  useEffect(() => {
    const fetchWalletTransactions = async () => {
      if (activeTab === 'wallet' && customer?.mobile) {
        setLoadingTransactions(true);
        try {
          const today = new Date();
          const toDate = today.toLocaleDateString('en-GB'); // dd/mm/yyyy
          const fromDate = "01/01/2024";

          const response = await fetch(
            `${siteApiBaseUrl}/walletApi.php?Contact=${customer.mobile}&FromDate=${fromDate}&ToDate=${toDate}`
          );
          const result = await response.json();
          
          if (result.message === "Success" && result.data) {
            setWalletTransactions(result.data);
          } else if (result.message === "Wallet not found") {
            setWalletTransactions([]); // Graceful handle for no wallet
          } else {
            console.error("Failed to fetch transactions:", result.message);
          }
        } catch (error) {
          console.error("Error fetching wallet transactions:", error);
        } finally {
          setLoadingTransactions(false);
        }
      }
    };

    fetchWalletTransactions();
  }, [activeTab, customer?.mobile]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "profile") navigate("/profile");
    else if (tab === "orders") navigate("/profile?tab=orders");
    else if (tab === "wallet") navigate("/profile?tab=wallet");
  };

  return (
    <div className="profile-container">
      <div className="title">My Account</div>
      
      <div className="custom-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => handleTabChange('profile')}
          >
            Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => handleTabChange('orders')}
          >
            Order History
          </button>
          <button 
            className={`tab-btn ${activeTab === 'wallet' ? 'active' : ''}`}
            onClick={() => handleTabChange('wallet')}
          >
            Pressto Wallet
          </button>
        </div>

        <div className="tabs-content">
          {activeTab === 'profile' && <ProfileData customer={customer} />}
          {activeTab === 'orders' && <OrderHistory customer={customer} />}
          {activeTab === 'wallet' && (
            <Wallet 
              customer={customer} 
              transactions={walletTransactions} 
              loading={loadingTransactions} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenRecharge } from '../redux/slices/sheetSlice';
import './RechargeSheet.scss';
import { X } from 'lucide-react';
import Logo from "../assets/images/logo.png";
import config from '../config/env';
import { toast } from 'react-toastify';

const { siteApiBaseUrl } = config;

const RechargeSheet = () => {
  const dispatch = useDispatch();
  const openRecharge = useSelector((state) => state.sheet.openRecharge);
  const customer = useSelector((state) => state.customer.customer);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecharge = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!customer) {
      toast.error("Please log in to recharge");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${siteApiBaseUrl}/razorpay.php?action=createPaymentLink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(amount),
          contact: customer.mobile,
          email: customer.email || "",
          name: `${customer.firstName} ${customer.lastName}`.trim()
        })
      });

      const result = await response.json();

      if (result.short_url) {
        // Save amount to finalize later
        localStorage.setItem("pending_recharge_amount", amount);
        // Redirect to Razorpay Payment Link
        window.location.href = result.short_url;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (error) {
      toast.error("Error initiating recharge");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BottomSheet
      open={openRecharge}
      onDismiss={() => dispatch(setOpenRecharge(false))}
      snapPoints={({ maxHeight }) => {
        const isMobile = window.innerWidth <= 768;
        return isMobile
          ? [maxHeight * 0.8, maxHeight * 0.7] 
          : [maxHeight * 0.9, maxHeight * 0.8];
      }}
      className="recharge-bottomsheet"
      header={
        <>
          <div className="sheetHeader"> <img src={Logo} alt="pressto" width="208px" height="46px" /></div>
          <div className="closesheet" onClick={() => dispatch(setOpenRecharge(false))}>
            <X size={22}/>
          </div>
        </>
      }
    >
      <div className="recharge-sheet-content">
        <div className="sheet-header">
          <h2>Recharge Wallet</h2>
          <p>Add money to your Pressto wallet</p>
        </div>

        <div className="input-group">
          <label htmlFor="recharge-amount">Enter Amount (₹)</label>
          <input
            id="recharge-amount"
            type="number"
            placeholder="e.g. 500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={loading}
          />
        </div>

        <button 
          className="recharge-submit-btn" 
          onClick={handleRecharge}
          disabled={loading}
        >
          {loading ? "Processing..." : "Recharge Now"}
        </button>
      </div>
    </BottomSheet>
  );
};

export default RechargeSheet;

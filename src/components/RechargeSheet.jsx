import React, { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenRecharge } from '../redux/slices/sheetSlice';
import './RechargeSheet.scss';
import { X } from 'lucide-react';
import Logo from "../assets/images/logo.png";

const RechargeSheet = () => {
  const dispatch = useDispatch();
  const openRecharge = useSelector((state) => state.sheet.openRecharge);
  const [amount, setAmount] = useState('');

  const handleRecharge = () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    console.log("Recharging amount:", amount);
    // Add logic here to integrate with payment gateway
    dispatch(setOpenRecharge(false));
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
          />
        </div>

        <button className="recharge-submit-btn" onClick={handleRecharge}>
          Recharge Now
        </button>
      </div>
    </BottomSheet>
  );
};

export default RechargeSheet;

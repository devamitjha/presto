import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = ({ orderResponse }) => {
  const isSuccess = orderResponse?.orderCreate === "success";
  const orderId = orderResponse?.orderIdStr || orderResponse?.orderId;

  return (
    <div className="form-step success-message">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <CheckCircle size={66} strokeWidth={1.25} color="#4CAF50" /> 
        <h2 style={{ marginTop: '20px' }}>Thank You for your booking!</h2>
        
        {isSuccess && orderId ? (
          <div className="order-details" style={{ marginTop: '15px' }}>
            <p style={{ fontSize: '18px', fontWeight: '500', color: '#000', marginBottom: '5px' }}>
              Order ID: <span style={{ color: '#5d5d81' }}>{orderId}</span>
            </p>
            <p style={{ fontSize: '15px', color: '#666' }}>Your pickup has been scheduled successfully.</p>
          </div>
        ) : (
          <p style={{ marginTop: '10px' }}>We’ve received your request, our team will contact you shortly to confirm the pickup.</p>
        )}
      </div>
    </div>
  );
};

export default SuccessMessage; 

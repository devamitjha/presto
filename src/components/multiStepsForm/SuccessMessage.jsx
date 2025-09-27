import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = () => {
  return (
    <div className="form-step success-message">
      <CheckCircle size={66} strokeWidth={1.25} color="#4CAF50" /> 
      <h2>Thank You for your booking!</h2>
      <p>We’ve received your request, our team will contact you Shortly to confirm the Pickup</p>
    </div>
  );
};

export default SuccessMessage; 

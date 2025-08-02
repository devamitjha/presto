import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = () => {
  return (
    <div className="form-step success-message">
      <CheckCircle size={48} color="#4CAF50" />
      <h2>Thank you for booking!</h2>
      <p>We've received your request. Our team will contact you shortly to confirm the pickup.</p>
    </div>
  );
};

export default SuccessMessage;

import React from 'react';

const PersonalDetails = ({ formData, handleChange, nextStep, errors }) => {
  const { name, email, phone } = formData;

  return (
    <div className="form-step">
      <input
        type="text"
        name="name"
        placeholder="Name*"
        value={name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email*"
        value={email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number*"
        value={phone}
        onChange={handleChange}
      />
      <button className="next-btn" onClick={nextStep}>
        Next
      </button>
    </div>
  );
};

export default PersonalDetails;

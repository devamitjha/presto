import React from 'react';

const PersonalDetails = ({ formData, handleChange, nextStep, errors }) => {
  const { name, email, phone } = formData;

  return (
    <div className="form-step">
      <div className="input-group floating-label with-button">
        <div className="input-wrapper">
          <input
              type="text"
              name="name"
              id="yourName"
              placeholder="Name*"
              value={name}
              onChange={handleChange}
              className={formData.name ? 'filled' : ''}
            />
          <label htmlFor="yourName">Name*</label>
        </div>
      </div>
      <div className="input-group floating-label with-button">
        <div className="input-wrapper">
           <input
              type="email"
              name="email"
              placeholder="Email*"
              value={email}
              onChange={handleChange}
              id="email"
              className={formData.email ? 'filled' : ''}
            />
          <label htmlFor="email">Email*</label>
        </div>
      </div>
      <div className="input-group floating-label with-button">
        <div className="input-wrapper">
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number*"
              value={phone}
              onChange={handleChange}
              id="phone"
              className={formData.phone ? 'filled' : ''}
            />
          <label htmlFor="phone">Phone Number*</label>
        </div>
      </div>
      
     
      
      <button className="next-btn" onClick={nextStep}>
        Next
      </button>
    </div>
  );
};

export default PersonalDetails;

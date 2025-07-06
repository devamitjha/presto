import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ContactDetails = ({ formData, handleChange, nextStep, prevStep, errors, handleLocate }) => {
  const [pickupDate, setPickupDate] = useState(formData.pickupDate ? new Date(formData.pickupDate) : null);
  const [pickupTime, setPickupTime] = useState(formData.pickupTime || '');

  const handleDateSelect = date => {
    setPickupDate(date);
    handleChange({ target: { name: 'pickupDate', value: date.toISOString().split('T')[0] } });
  };

  const handleTimeChange = e => {
    const time = e.target.value;
    setPickupTime(time);
    handleChange({ target: { name: 'pickupTime', value: time } });
  };

  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  return (
    <div className="form-step">
      <div className="input-group with-button">
        <input
          type="text"
          name="city"
          placeholder="Enter City/Pincode"
          value={formData.city || ''}
          onChange={handleChange}
        />
        <button type="button" onClick={handleLocate}>Locate Me</button>
      </div>

      <div className="input-group with-button">
        <input
          type="text"
          name="address"
          placeholder="House Address/Street"
          value={formData.address || ''}
          onChange={handleChange}
        />
        <button type="button">Change</button>
      </div>

      <div className="input-group">
        <label>Pickup Date</label>
        <DatePicker
          selected={pickupDate}
          onChange={handleDateSelect}
          minDate={getToday()}
          placeholderText="Select a date"
          className="custom-datepicker"
        />
      </div>

      <div className="input-group">
        <label>Pickup Time</label>
        <input
          type="time"
          value={pickupTime}
          name="pickupTime"
          onChange={handleTimeChange}
          min="09:00"
          max="18:00"
        />
      </div>

      <div className="buttons">
        <button onClick={prevStep}>Back</button>
        <button onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default ContactDetails;

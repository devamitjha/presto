import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock } from 'lucide-react';

const ContactDetails = ({ formData, handleChange, nextStep, prevStep, errors, handleLocate }) => {
  const [pickupDate, setPickupDate] = useState(formData.pickupDate ? new Date(formData.pickupDate) : null);
  const [pickupTime, setPickupTime] = useState(formData.pickupTime || '');

  const calendarRef = useRef();
  const timeRef = useRef();

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

      {/* City */}
      <div className="input-group floating-label with-button">
        <div className="input-wrapper">
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            className={formData.city ? 'filled' : ''}
          />
          <label htmlFor="city">Enter City/Pincode</label>
        </div>
        <button type="button" onClick={handleLocate} className="side-button">Locate Me</button>
      </div>

      {/* Address */}
      <div className="input-group floating-label with-button">
        <div className="input-wrapper">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className={formData.address ? 'filled' : ''}
          />
          <label htmlFor="address">House Address/Street</label>
        </div>
        <button type="button" className="side-button">Change</button>
      </div>

      {/* Pickup Date */}
      <div className="input-group floating-label with-icon">
        <div className="input-wrapper">
          <DatePicker
            ref={calendarRef}
            selected={pickupDate}
            onChange={handleDateSelect}
            minDate={getToday()}
            className={`custom-datepicker ${pickupDate ? 'filled' : ''}`}
            id="pickupDate"
            dateFormat="yyyy-MM-dd"
          />
          <label htmlFor="pickupDate" className={pickupDate ? 'floating' : ''}>Pick up Date</label>
          <Calendar size={18} className="input-icon" onClick={() => calendarRef.current.setFocus()} />
        </div>
      </div>

      {/* Pickup Time */}
      <div className="input-group floating-label with-icon">
        <div className="input-wrapper">
          <input
            ref={timeRef}
            type="time"
            id="pickupTime"
            name="pickupTime"
            value={pickupTime}
            onChange={handleTimeChange}
            min="09:00"
            max="18:00"
            className={pickupTime ? 'filled' : ''}
          />
          <label htmlFor="pickupTime">Pick up Time</label>
          <Clock size={18} className="input-icon" onClick={() => timeRef.current.showPicker?.() || timeRef.current.focus()} />
        </div>
      </div>

      <div className="buttons">
        <button onClick={prevStep} className="next-btn">Back</button>
        <button onClick={nextStep} className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default ContactDetails;

import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock } from 'lucide-react';

const ContactDetails = ({ formData, handleChange, nextStep, prevStep, errors, handleLocate }) => {
  const [pickupDate, setPickupDate] = useState(formData.pickupDate ? new Date(formData.pickupDate) : null);
  const [pickupTime, setPickupTime] = useState(formData.pickupTime ? new Date(`1970-01-01T${formData.pickupTime}`) : null);

  const calendarRef = useRef();
  const timeRef = useRef();

  const handleDateSelect = date => {
    setPickupDate(date);
    handleChange({
      target: { name: 'pickupDate', value: date.toISOString().split('T')[0] }
    });
  };

  const handleTimeSelect = (time) => {
    if (!time) {
      setPickupTime(null);
      handleChange({ target: { name: 'pickupTime', value: '' } });
      return;
    }

    setPickupTime(time);

    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');

    handleChange({
      target: { name: 'pickupTime', value: `${hours}:${minutes}` }
    });
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

      {/* Pickup Time with React DatePicker */}
      <div className="input-group floating-label with-icon">
        <div className="input-wrapper">
          <DatePicker
            ref={timeRef}
            selected={pickupTime}
            onChange={handleTimeSelect}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15} // every 15 min
            minTime={new Date(0, 0, 0, 10, 0)} // 10:00 AM
            maxTime={new Date(0, 0, 0, 18, 0)} // 6:00 PM
            dateFormat="HH:mm"
            className={`custom-datepicker ${pickupTime ? 'filled' : ''}`}
            placeholderText="Select time"
          />
          <label htmlFor="pickupTime" className={pickupTime ? 'floating' : ''}>Pick up Time</label>
          <Clock size={18} className="input-icon" onClick={() => timeRef.current.setFocus()} />
        </div>
      </div>

      <div className="buttons">
        <button type="button" onClick={prevStep} className="next-btn">Back</button>
        <button type="button" onClick={nextStep} className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default ContactDetails;

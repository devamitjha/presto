import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactDetails = ({ formData, handleChange, nextStep, prevStep, errors, handleLocate, userLoggedIn }) => {
  const [pickupDate, setPickupDate] = useState(formData.pickupDate ? new Date(formData.pickupDate) : null);
  const [pickupTime, setPickupTime] = useState(
    formData.pickupTime ? new Date(`1970-01-01T${formData.pickupTime}`) : null
  );

  const calendarRef = useRef();
  const timeRef = useRef();

  const handleDateSelect = (date) => {
    setPickupDate(date);

    if (!date) {
      handleChange({ target: { name: 'pickupDate', value: '' } });
      return;
    }

    handleChange({ target: { name: 'pickupDate', value: date.toISOString().split('T')[0] } });
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
    handleChange({ target: { name: 'pickupTime', value: `${hours}:${minutes}` } });
  };

  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const handleNextStep = () => {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
    if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((msg) => toast.error(msg, { autoClose: 2500 }));
      return;
    }

    nextStep();
  };

  return (
    <div className="form-step">
      {/* City */}
      <div className="inputGroup floating-label with-button">
        <div className="input-wrapper">
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city || ''}
            onChange={handleChange}
            className={formData.city ? 'filled' : ''}
           disabled = {userLoggedIn && formData.city!=""}
          />
          <label htmlFor="city">Enter City*</label>
        </div>
        {
          !userLoggedIn && <button type="button" onClick={handleLocate} className="side-button">Locate Me</button>
        }
      </div>

      {/* Pincode */}
      <div className="inputGroup floating-label with-button">
        <div className="input-wrapper">
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode || ''}
            onChange={handleChange}
            className={formData.pincode ? 'filled' : ''}
            disabled = {userLoggedIn && formData.pincode!=""}
          />
          <label htmlFor="pincode">Pincode*</label>
        </div>
      </div>

      {/* Address */}
      <div className="inputGroup floating-label with-button">
        <div className="input-wrapper">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address || ''}
            onChange={handleChange}
            className={formData.address ? 'filled' : ''}
            disabled = {userLoggedIn}
          />
          <label htmlFor="address">House Address/Street*</label>
        </div>
      </div>

      {/* Pickup Date */}
      <div className="inputGroup floating-label with-icon">
        <div className="input-wrapper">
          <DatePicker
            ref={calendarRef}
            selected={pickupDate}
            onChange={handleDateSelect}
            minDate={getToday()}
            className={`custom-datepicker ${pickupDate ? 'filled' : ''}`}
            id="pickupDate"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Date"
            isClearable
          />
          <label htmlFor="pickupDate" className={pickupDate ? 'floating' : ''}>Pick up Date*</label>
          <Calendar size={18} className="input-icon" onClick={() => calendarRef.current.setFocus()} />
        </div>
      </div>

      {/* Pickup Time */}
      <div className="inputGroup floating-label with-icon">
        <div className="input-wrapper">
          <DatePicker
            ref={timeRef}
            selected={pickupTime}
            onChange={handleTimeSelect}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            minTime={new Date(0, 0, 0, 10, 0)}
            maxTime={new Date(0, 0, 0, 18, 0)}
            dateFormat="HH:mm"
            className={`custom-datepicker ${pickupTime ? 'filled' : ''}`}
            placeholderText="Select Time"
            isClearable
          />
          <label htmlFor="pickupTime" className={pickupTime ? 'floating' : ''}>Pick up Time*</label>
          <Clock size={18} className="input-icon" onClick={() => timeRef.current.setFocus()} />
        </div>
      </div>

      <div className="buttons">
        <button type="button" onClick={prevStep} className="next-btn">Back</button>
        <button type="button" onClick={handleNextStep} className="next-btn">Next</button>
      </div>
    </div>
  );
};

export default ContactDetails;

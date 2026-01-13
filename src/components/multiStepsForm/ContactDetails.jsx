import React, { useRef, useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

const ContactDetails = ({ formData, handleChange, nextStep, prevStep, errors, handleLocate, userLoggedIn }) => {
  const firstInputRef = useRef(null);
  const [pickupDate, setPickupDate] = useState(formData.pickupDate ? new Date(formData.pickupDate) : null);
  // const [pickupTime, setPickupTime] = useState(
  //   formData.pickupTime ? new Date(`1970-01-01T${formData.pickupTime}`) : null
  // );

  const calendarRef = useRef();

  const handleDateSelect = (date) => {
    setPickupDate(date);

    if (!date) {
      handleChange({ target: { name: 'pickupDate', value: '' } });
      return;
    }

    handleChange({ target: { name: 'pickupDate', value: date.toISOString().split('T')[0] } });
  };

  // const handleTimeSelect = (time) => {
  //   if (!time) {
  //     setPickupTime(null);
  //     handleChange({ target: { name: 'pickupTime', value: '' } });
  //     return;
  //   }

  //   setPickupTime(time);
  //   const hours = time.getHours().toString().padStart(2, '0');
  //   const minutes = time.getMinutes().toString().padStart(2, '0');
  //   handleChange({ target: { name: 'pickupTime', value: `${hours}:${minutes}` } });
  // };

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

    const generateTimeOptions = () => {
      const times = [];
      let start = 10; // 10 AM
      let end = 18;   // 6 PM

      for (let hour = start; hour <= end; hour++) {
        for (let min of [0, 30]) {
          if (hour === end && min > 0) break; // stop at 6:00 PM
          const h12 = hour % 12 === 0 ? 12 : hour % 12;
          const ampm = hour < 12 ? "AM" : "PM";
          const label = `${h12.toString().padStart(2, "0")}:${min
            .toString()
            .padStart(2, "0")} ${ampm}`;
          times.push(label);
        }
      }
      return times;
    };

    useEffect(() => {
      firstInputRef.current?.focus();
    }, []);

  return (
    <div className="form-step">
      <div
        ref={firstInputRef}
        tabIndex={-1}
        style={{height: "1px", outline: 'none' }}
      />
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
            //disabled = {userLoggedIn && formData.city!==""}
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
           // disabled = {userLoggedIn && formData.pincode!==""}
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
            //disabled = {userLoggedIn}
          />
          <label htmlFor="address">House Address/Street*</label>
        </div>
      </div>

      {/* Pickup Date */}
      <div className="inputGroup floating-label with-icon">
        <div className="input-wrapper datePicker">
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
        <div className="input-wrapper timepicker">
          <select
            id="pickupTime"
            name="pickupTime"
            className={`custom-select ${formData.pickupTime ? "filled" : ""}`}
            value={formData.pickupTime || ""}
            onChange={(e) => handleChange({ target: { name: "pickupTime", value: e.target.value } })}
          >
            <option value="">Select Time</option>
            {generateTimeOptions().map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <label htmlFor="pickupTime" className={formData.pickupTime ? "floating" : ""}>
            Pick up Time*
          </label>
          <Clock size={18} className="input-icon" />
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

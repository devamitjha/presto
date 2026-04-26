import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import config from '../../config/env';

const { siteApiBaseUrl } = config;

const PersonalDetails = ({ formData, handleChange, nextStep, userLoggedIn }) => {
  const firstInputRef = useRef(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0); // seconds
  const [intervalId, setIntervalId] = useState(null);

  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const startTimer = () => {
    setTimer(600); // 10 minutes
    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setIntervalId(id);
  };

  const handleSendOtp = async () => {
    const { firstName, lastName, contact } = formData;

    if (!firstName.trim()) return toast.error("First Name is required", { autoClose: 2500 });
    if (!lastName.trim()) return toast.error("Last Name is required", { autoClose: 2500 });
    if (!contact.trim()) return toast.error("Phone number is required", { autoClose: 2500 });
    if (!validateMobile(contact)) return toast.error("Phone must be 10 digits", { autoClose: 2500 });

    try {
      const response = await fetch(`${siteApiBaseUrl}/send-otp.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mobile: `+91${contact}` }),
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem("otp", result.otp);
        sessionStorage.setItem("mobile", contact);
        toast.success("OTP sent successfully!", { autoClose: 2500 });
        setOtpSent(true);
        startTimer();
      } else {
        toast.error(result.message || "Failed to send OTP.", { autoClose: 2500 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP. Please try again.", { autoClose: 2500 });
    }
  };

  const handleNext = () => {
    const { firstName, lastName, contact } = formData;
    const storedOtp = sessionStorage.getItem("otp");
    const storedMobile = sessionStorage.getItem("mobile");

    if (!firstName.trim()) return toast.error("First Name is required", { autoClose: 2500 });
    if (!lastName.trim()) return toast.error("Last Name is required", { autoClose: 2500 });
    if (!contact.trim()) return toast.error("Phone number is required", { autoClose: 2500 });
    if (!validateMobile(contact)) return toast.error("Phone must be 10 digits", { autoClose: 2500 });
    if (!otp.trim()) return toast.error("Please enter OTP", { autoClose: 2500 });
    if (otp !== storedOtp || contact !== storedMobile) return toast.error("Incorrect OTP", { autoClose: 2500 });

    sessionStorage.removeItem("otp");
    sessionStorage.removeItem("mobile");
    nextStep();
  };

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60).toString().padStart(2, "0");
    const seconds = (timer % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    return () => intervalId && clearInterval(intervalId);
  }, [intervalId]);

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
      <div className="input-row">
        <div className="inputGroup floating-label with-button flex-input">
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                className={formData.firstName ? "filled" : ""}
              />
              <label>First Name*</label>
            </div>
          </div>
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
                className={formData.lastName ? "filled" : ""}
              />
              <label>Last Name*</label>
            </div>
          </div>
        </div>
      </div>

      <div className="inputGroup floating-label with-button">
        <div className="input-wrapper">
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className={formData.email ? "filled" : ""}
           // disabled={userLoggedIn && formData.email?.trim() !== ""}
          />
          <label>Email</label>
        </div>
      </div>

      <div className="inputGroup floating-label with-button send-otp">
        <div className="input-wrapper">
          <input
            type="tel"
            name="contact"
            value={formData.contact || ""}
            onChange={handleChange}
            className={formData.contact ? "filled" : ""}
            disabled={userLoggedIn && formData.contact !== ""}
          />
          <label>Phone Number*</label>
        </div>

        {!userLoggedIn && (
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpSent && timer > 0}
            className="side-button sendOtp"
          >
            {otpSent && timer > 0 ? `Resend OTP in ${formatTimer()}` : "Send OTP"}
          </button>
        )}
      </div>

      {!userLoggedIn && otpSent && (
        <div className="inputGroup floating-label">
          <div className="input-wrapper">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={otp ? "filled" : ""}
            />
            <label>Enter OTP</label>
          </div>
        </div>
      )}

      {!userLoggedIn && (
        <button className="next-btn" onClick={handleNext} disabled={!otpSent}>
          Next
        </button>
      )}

      {userLoggedIn && (
        <button className="next-btn" onClick={nextStep}>
          Next
        </button>
      )}
    </div>
  );
};

export default PersonalDetails;

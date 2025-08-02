import React, { useState } from "react";
import axios from "axios";
import "./AuthFlow.scss";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { getLoginInfoByMobile, registerUser } from '../services/userServices';

const HelmetMeta = () => {
  return (
      <Helmet>
        <title>Login Page | Login Page</title>
        <meta name="description" content="Learn more about our company and mission." />
        <meta name="keywords" content="about us, company, mission, values" />
        <link rel="canonical" href="https://www.yoursite.com" />
      </Helmet>
  )
}

const Authorization = () => {
  const [step, setStep] = useState("login-mobile"); // steps: login-mobile, login-otp, register, register-otp
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address: "",
    pincode: ""
  });

  // 1. Validate and send OTP using MSG91
  
  const handleSendOtp = async () => {
    if (!mobile || mobile.length !== 10 || isNaN(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.", { autoClose: 2500 });
      return;
    }

    try {
      const response = await fetch('https://www.presstoindia.com/send-otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // ✅ include session cookie
        body: JSON.stringify({ mobile: `+91${mobile}` })
      });

      const result = await response.json();

      if (result.success) {
        toast.success("OTP sent successfully!", { autoClose: 2500 });
        setStep("login-otp");
      } else {
        toast.error(result.message || "Failed to send OTP.", { autoClose: 2500 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.", { autoClose: 2500 });
    }
  };



  // 2. Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.", { autoClose: 2500 });
      return;
    }

    try {
      const otpResponse = await fetch("https://www.presstoindia.com/verify-otp.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include', // ✅ must match send OTP request
        body: JSON.stringify({ mobile: `+91${mobile}`, otp })
      });

      const otpResult = await otpResponse.json();

      if (otpResult.success) {
        const loginResponse = await getLoginInfoByMobile(mobile);
        if (loginResponse.data?.registered) {
          toast.success("Login successful!", { autoClose: 2500 });
          // navigate("/profile");
        } else {
          toast.error("User not registered. Redirecting to registration...", { autoClose: 2500 });
          setFormData({ ...formData, contact: mobile });
          setStep("register");
        }
      } else {
        toast.error(otpResult.message || "Incorrect OTP.", { autoClose: 2500 });
      }
    } catch (err) {
      console.error(err);
      toast.error("OTP verification failed.", { autoClose: 2500 });
    }
  };



  // 3. Register new user and send OTP
  const handleRegisterSubmit = async () => {
    const { firstName, lastName, email, contact, address, pincode } = formData;

    if (!firstName || !lastName || !email || !contact || !address || !pincode) {
      toast.error("All fields are required.", { autoClose: 2500 });
      return;
    }

    try {
      await axios.post("/api/send-otp-msg91", { mobile: contact });
      setStep("register-otp");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP for registration.", { autoClose: 2500 });
    }
  };

  // 4. Verify OTP again then register user
  const handleFinalOtpVerify = async () => {
    if (!otp) {
      toast.error("Please enter the OTP.", { autoClose: 2500 });
      return;
    }

    try {
      const verifyResponse = await axios.post("/api/verify-otp-msg91", {
        mobile: formData.contact,
        otp
      });

      if (verifyResponse.data.verified) {
        const result = await registerUser(formData);
        console.log(result);
        toast.success("Registration successful. Redirecting to login...", { autoClose: 2500 });
        setStep("login-mobile");
        setMobile("");
        setOtp("");
      } else {
         toast.error("Invalid OTP.", { autoClose: 2500 });
      }
    } catch (err) {
      console.error(err);
      toast.error("Registration OTP verification failed.", { autoClose: 2500 });
    }
  };
  return (
    <section className="section-container">
      <HelmetMeta/>
      <div className="auth-flow">
      {step === "login-mobile" && (
        <div className="card">
          <h2>Login with Mobile</h2>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      )}

      {step === "login-otp" && (
        <div className="card">
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === "register" && (
        <div className="card">
          <h2>Register New User</h2>
          <input
            type="text"
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Contact"
            value={formData.contact}
            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
          />
          <button onClick={handleRegisterSubmit}>Send OTP</button>
        </div>
      )}

      {step === "register-otp" && (
        <div className="card">
          <h2>Verify OTP to Complete Registration</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleFinalOtpVerify}>Verify & Register</button>
        </div>
      )}
      </div>
    </section>
  );
};

export default Authorization

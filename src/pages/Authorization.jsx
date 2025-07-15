import React, { useState } from "react";
import axios from "axios";
import "./AuthFlow.scss";
import { Helmet } from "react-helmet";

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
// first user will input mobile number
    //then api will check this number is exist or not
        //if yes => otp will be trigger after that
            // verify otp
            // go to  user profile
//if not => 
    // input form will be open
        // First Name
        // Last Name
        // Email
        // Phone
        // Address
        // Pincode
          //then => otp will be trigger for mobile auth
              //then => otp will be verify => user will be redirected to my account page
      

const Authorization = () => {
   const [step, setStep] = useState("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    pincode: ""
  });

  const handleMobileSubmit = async () => {
    try {
      const response = await axios.post("/api/check-user", { phone: mobile });
      if (response.data.exists) {
        await axios.post("/api/send-otp", { phone: mobile });
        setStep("otp");
      } else {
        setFormData({ ...formData, phone: mobile });
        setStep("form");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to check user. Try again.");
    }
  };

  const handleFormSubmit = async () => {
    try {
      await axios.post("/api/register", formData);
      await axios.post("/api/send-otp", { phone: formData.phone });
      setStep("otp");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    }
  };

  const handleOtpVerify = async () => {
    try {
      const response = await axios.post("/api/verify-otp", {
        phone: formData.phone || mobile,
        otp
      });

      if (response.data.verified) {
        alert("OTP Verified. Redirecting to My Account...");
        setStep("done");
        // Navigate to profile page if using react-router
        // navigate("/my-account");
      } else {
        alert("Invalid OTP.");
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed.");
    }
  };

  return (
    <div className="auth-flow">
      {step === "mobile" && (
        <div className="card">
          <h2>Enter Mobile Number</h2>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number"
          />
          <button onClick={handleMobileSubmit}>Continue</button>
        </div>
      )}

      {step === "form" && (
        <div className="card">
          <h2>Create Account</h2>
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
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
          <button onClick={handleFormSubmit}>Send OTP</button>
        </div>
      )}

      {step === "otp" && (
        <div className="card">
          <h2>Enter OTP</h2>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleOtpVerify}>Verify OTP</button>
        </div>
      )}

      {step === "done" && (
        <div className="card">
          <h2>Success!</h2>
          <p>Redirecting to your profile...</p>
        </div>
      )}
    </div>
  );
};

export default Authorization

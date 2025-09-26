import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./AuthFlow.scss";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCustomer } from "../redux/slices/customerSlice"; 
import { setOpenSheet } from "../redux/slices/sheetSlice";
import {show, hide } from "../redux/slices/uiSlice";


const Authorization = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state) => state.loadingUI.isVisible);
  const navigate = useNavigate();
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
    dispatch(show());
    if (!mobile || mobile.length !== 10 || isNaN(mobile)) {
      toast.error("Please enter a valid 10-digit mobile number.", { autoClose: 2500 });
      dispatch(hide());
      return;
    }

    try {
      const response = await fetch('https://www.presstoindia.com/send-otp.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ mobile: `+91${mobile}` })
      });

      const result = await response.json();

      if (result.success) {
        sessionStorage.setItem("otp", result.otp);
        sessionStorage.setItem("mobile", mobile);
        toast.success("OTP sent successfully!", { autoClose: 2500 });
        setStep("login-otp");
        dispatch(hide());
      } else {
        toast.error(result.message || "Failed to send OTP.", { autoClose: 2500 });
        dispatch(hide());
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send OTP. Please try again.", { autoClose: 2500 });
      dispatch(hide());
    }
  };

  // 2. Verify OTP
  const handleVerifyOtp = async () => {
    dispatch(show());
    if (!otp) {
      toast.error("Please enter the OTP.", { autoClose: 2500 });
      dispatch(hide());
      return;
    }

  const storedOtp = sessionStorage.getItem("otp");
  const storedMobile = sessionStorage.getItem("mobile");

  if (!storedOtp || !storedMobile) {
    toast.error("No OTP session found. Please request a new OTP.", { autoClose: 2500 });
    setStep("login-otp");
    dispatch(hide());
    return;
  }

  if (otp === storedOtp && mobile === storedMobile) {
    try {
      //const loginResponse = await getLoginInfoByMobile(mobile);
      const loginResponse = await fetch(
        `https://uat.presstoindia.com/authApi.php?action=login&mobile=${mobile}`
      );
      const data = await loginResponse.json();

      if (data?.customerUniqueId) {
        toast.success("Login successful!", { autoClose: 2500 });
        dispatch(setCustomer(data));
        setOtp("");
        dispatch(setOpenSheet(false));
        navigate("/profile");
        // Clear OTP from session storage
        sessionStorage.removeItem("otp");
        sessionStorage.removeItem("mobile");
        dispatch(hide());
      } else {
        toast.error("User not registered. Redirecting to registration...", { autoClose: 2500 });
        setFormData({ ...formData, contact: mobile });
        setStep("register");
        dispatch(hide());
      }

    } catch (err) {
      console.error("Login API error:", err);
      // Optional: If the backend sends a JSON body even for errors:
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || "User not registered. Redirecting to registration...", { autoClose: 2500 });
        dispatch(hide());
      } else {
        toast.error("User not registered. Redirecting to registration...", { autoClose: 2500 });
        dispatch(hide());
      }

      // Redirect to register form
      setFormData({ ...formData, contact: mobile });
      setStep("register");
      dispatch(hide());
    }

  } else {
    toast.error("Incorrect OTP.", { autoClose: 2500 });
    dispatch(hide());
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
        const response = await fetch('https://www.presstoindia.com/send-otp.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ mobile: `+91${contact}` })
        });

        const result = await response.json();

        if (result.success) {
          setOtp("");
          sessionStorage.setItem("otp", result.otp);
          sessionStorage.setItem("mobile", contact);
          toast.success("OTP sent successfully!", { autoClose: 2500 });
          setStep("register-otp");
        } else {
          toast.error(result.message || "Failed to send OTP.", { autoClose: 2500 });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to send OTP for registration.", { autoClose: 2500 });
      }
  };

  // 4. Verify OTP again then register user
  const handleFinalOtpVerify = async () => {
    dispatch(show());
    const { firstName, lastName, email, contact, address, pincode } = formData;

    if (!firstName || !lastName || !email || !contact || !address || !pincode) {
      toast.error("All fields are required.", { autoClose: 2500 });
      dispatch(hide());
      return;
    }

    try {
        const storedMobile = sessionStorage.getItem("mobile");  
        if (!storedMobile) {
          toast.error("No OTP session found. Please request a new OTP.", { autoClose: 2500 });
          return;
        }  

        if (mobile === storedMobile) {
         
          const response = await fetch(
              "https://uat.presstoindia.com/authApi.php?action=register",
              {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData)
              }
          );
           let registerData = {};
            try {
              registerData = await response.json();
            } catch {
              registerData = {};
            }
          console.log(registerData);
          
          if(registerData && !registerData.error){
              const loginResponse = await fetch(
                `https://uat.presstoindia.com/authApi.php?action=login&mobile=${mobile}`
              );
              const data = await loginResponse.json();

              if (data?.customerUniqueId) {
                toast.success("Registration successful.", { autoClose: 2500 });
                dispatch(setCustomer(data));
                setOtp("");
                dispatch(setOpenSheet(false));
                navigate("/profile");
                sessionStorage.removeItem("otp");
                sessionStorage.removeItem("mobile");   
              } else {
                toast.error("User not registered. Redirecting to registration...", { autoClose: 2500 });
                setFormData({ ...formData, contact: mobile });
                setStep("register");
              }
              //login user
              dispatch(hide());
          }else{
            toast.error("Something wrong.", { autoClose: 2500 });
            dispatch(hide());
          }  
                
        } else {
          toast.error("Invalid OTP.", { autoClose: 2500 });
          dispatch(hide());
          }
    } catch (error) {
        console.error(error);
        toast.error("Registration OTP verification failed.", { autoClose: 2500 });
        dispatch(hide());
      }
  };
  return (
    <section className="section-container">
      <div className="authflow">
      {step === "login-mobile" && (
        <div className="card">
          <h2>LOGIN & SIGNUP</h2>
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <button onClick={handleSendOtp} disabled={isVisible}>{isVisible ? "Sending OTP..." : "Send OTP"}</button>
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
          <button onClick={handleVerifyOtp} disabled={isVisible}>{isVisible ? "Login..." : "Verify & Login"}</button>
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
          <div className="validMobile">
            {formData.contact}
          </div>
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
          <button onClick={handleFinalOtpVerify} disabled={isVisible}>{isVisible ? "Registering..." : "Register"}</button>
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

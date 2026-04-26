import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

import PersonalDetails from "./multiStepsForm/PersonalDetails";
import ContactDetails from "./multiStepsForm/ContactDetails";
import Review from "./multiStepsForm/Review";
import SuccessMessage from "./multiStepsForm/SuccessMessage";

import { setCustomer } from "../redux/slices/customerSlice";
import { show, hide } from "../redux/slices/uiSlice";
import { setOpenBookNow, closeBookNow } from "../redux/slices/sheetSlice";

import Heading from "./common/Heading";
import Experties from "./Experties";
import { expertiseData } from "../api/expertiseData";
import { Image } from "@imagekit/react";
import config from "../config/env";
import "./BookNow.scss";

const { siteApiBaseUrl } = config;

const BookNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openBookNow = useSelector((state) => state.sheet.openBookNow);
  const closeType = useSelector((state) => state.sheet.bookNowCloseType);

  /* ---------------- STATE ---------------- */

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const lifecycle = useRef({
    mounted: false,
    opened: false,
    interacted: false,
    submitted: false,
    submitting: false,
    abandonedSent: false,
  });

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    city: "",
    pincode: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
    serviceCounts: {},
    instructions: "",
  });

  const latestFormDataRef = useRef(formData);
  const latestStepRef = useRef(step);

  useEffect(() => { latestFormDataRef.current = formData; }, [formData]);
  useEffect(() => { latestStepRef.current = step; }, [step]);

  /* ---------------- HANDLE SHEET OPEN/CLOSE ---------------- */

  useEffect(() => {

    if (!lifecycle.current.mounted) {
      lifecycle.current.mounted = true;
      return;
    }

    // OPENED
    if (openBookNow) {
      lifecycle.current.opened = true;
      lifecycle.current.interacted = false;
      lifecycle.current.submitted = false;
      lifecycle.current.submitting = false;
      lifecycle.current.abandonedSent = false;
      return;
    }

    // CLOSED → ONLY MANUAL
    if (closeType === "manual") {
      const shouldSendAbandoned =
        lifecycle.current.opened &&
        lifecycle.current.interacted &&
        !lifecycle.current.submitted &&
        !lifecycle.current.submitting &&
        !lifecycle.current.abandonedSent;

      if (shouldSendAbandoned) sendAbandonedEmail();
    }

    lifecycle.current.opened = false;

  }, [openBookNow, closeType]);

  /* ---------------- AUTO FILL USER ---------------- */

  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));

    if (customer?.customerId) {
      setFormData((prev) => ({
        ...prev,
        firstName: customer.firstName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        contact: customer.mobile || "",
        address: customer.address || "",
        pincode: customer.pincode || "",
      }));

      setUserLoggedIn(true);
      dispatch(setCustomer(customer));
    }
  }, [dispatch]);

  /* ---------------- INPUT CHANGE ---------------- */

  const handleChange = (e) => {
    lifecycle.current.interacted = true;
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ---------------- VALIDATION ---------------- */

  const validatePhone = (contact) => /^\d{10}$/.test(contact);

  const validateStep = () => {
    const errors = {};

    if (step === 1) {
      if (!formData.firstName.trim()) errors.firstName = "First name required";
      if (!formData.lastName.trim()) errors.lastName = "Last name required";
      if (!validatePhone(formData.contact)) errors.contact = "Valid phone required";
    }

    if (step === 2) {
      if (!formData.city) errors.city = "City required";
      if (!formData.address) errors.address = "Address required";
      if (!formData.pickupDate) errors.pickupDate = "Pickup date required";
      if (!formData.pickupTime) errors.pickupTime = "Pickup time required";
    }

    if (step === 3) {
      const hasService = Object.values(formData.serviceCounts || {}).some((c) => c > 0);
      if (!hasService) {
        toast.error("Select at least one service");
        return false;
      }
    }

    Object.values(errors).forEach((msg) => toast.error(msg));
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => validateStep() && setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  /* ---------------- LOGIN / REGISTER ---------------- */

  const handleUserLoginOrRegister = async () => {
  try {
    // Login API
    const loginResponse = await fetch(
      `${siteApiBaseUrl}/authApi.php?action=login&mobile=${formData.contact}`
    );

    let loginData = {};
    try {
      loginData = await loginResponse.json();
    } catch {
      loginData = {};
    }
    console.log(loginData);

    if (loginData?.customerId) {
      const customer = {
        customerId: loginData.customerId,
        firstName: loginData.firstName || '',
        lastName: loginData.lastName || '',
        email: loginData.email || '',
        mobile: loginData.contact || '',
        pincode: loginData.pincode || '',
        address: loginData.address || '',
        customerUniqueId: loginData.customerUniqueId || ''
      };
      localStorage.setItem("customer", JSON.stringify(customer));
      dispatch(setCustomer(customer));
      setFormData(prev => ({ ...prev, ...customer }));
      setUserLoggedIn(true);
      return true; // Already registered
    }

    // Register API if login failed
    const registerResponse = await fetch(
      `${siteApiBaseUrl}/authApi.php?action=register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      }
    );

    let registerData = {};
    try {
      registerData = await registerResponse.json();
    } catch {
      registerData = {};
    }

    if (registerData && !registerData.error) {
      const loginResponse = await fetch(
        `${siteApiBaseUrl}/authApi.php?action=login&mobile=${formData.contact}`
      );
      let loginData = {};
      try {
        loginData = await loginResponse.json();
      } catch {
        loginData = {};
      }
      if (loginData?.customerId) {
        const customer = {
          customerId: loginData.customerId,
          firstName: loginData.firstName || '',
          lastName: loginData.lastName || '',
          email: loginData.email || '',
          mobile: loginData.contact || '',
          pincode: loginData.pincode || '',
          address: loginData.address || '',
          customerUniqueId: loginData.customerUniqueId || ''
        };
        localStorage.setItem("customer", JSON.stringify(customer));
        dispatch(setCustomer(customer));
        setFormData(prev => ({ ...prev, ...customer }));
        setUserLoggedIn(true);
        return false; 
      }
    }

    toast.error(registerData.message || "Failed to register user", { autoClose: 2500 });
    return false;

    } catch (err) {
      console.error(err);
      toast.error("Error during login/register", { autoClose: 2500 });
      return false;
    }
  };


  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async () => {
    if (!validateStep()) return;

    lifecycle.current.submitted = true;
    lifecycle.current.submitting = true;

    dispatch(show());

    try {
      await handleUserLoginOrRegister();

      const data = latestFormDataRef.current;
      const stepReached = latestStepRef.current;

      await emailjs.send(
        "service_r4xqjrl",
        "template_57923u2",
        {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email || "Not Provided",
          phone: data.contact || "Not Provided",
          city: data.city || "",
          address: data.address || "",
          pickupDate: data.pickupDate || "",
          pickupTime: data.pickupTime || "",
          serviceCounts: JSON.stringify(data.serviceCounts || {}),
          instructions: data.instructions || "",
          form_step: stepReached,
          form_status: "SUBMITTED",
        },
        "cawbEAs7EEHSVWlQI"
      );

      lifecycle.current.abandonedSent = true;

      setIsSubmitted(true);
      setSuccessPopup(true);
      dispatch(hide());

      dispatch(closeBookNow("submit")); // ⭐ important

    } catch {
      lifecycle.current.submitted = false;
      toast.error("Submit failed");
    } finally {
      lifecycle.current.submitting = false;
    }
  };

  /* ---------------- ABANDONED EMAIL ---------------- */

  const sendAbandonedEmail = async () => {
    if (lifecycle.current.abandonedSent) return;
    lifecycle.current.abandonedSent = true;

    try {
      const data = latestFormDataRef.current;
      const stepReached = latestStepRef.current;

      await emailjs.send(
        "service_r4xqjrl",
        "template_57923u2",
        {
          name: `${data.firstName || ""} ${data.lastName || ""}`,
          email: data.email || "Not Provided",
          phone: data.contact || "Not Provided",
          city: data.city || "",
          address: data.address || "",
          pickupDate: data.pickupDate || "",
          pickupTime: data.pickupTime || "",
          serviceCounts: JSON.stringify(data.serviceCounts || {}),
          instructions: data.instructions || "",
          form_step: stepReached,
          form_status: "ABANDONED",
        },
        "cawbEAs7EEHSVWlQI"
      );

    } catch {
      console.log("Abandoned mail failed");
    }
  };

  /* ---------------- NAVIGATION ---------------- */

  const goToStoretPage = () => {
    dispatch(closeBookNow("navigation"));
    navigate("/store");
  };

  const goToBookNowPage = () => {
    dispatch(setOpenBookNow(true));
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="booknowsheet">
      <div className="sheetTitle">BOOK SERVICE</div>

      <div className="section-container">
        {isSubmitted ? (
          <SuccessMessage showGoToOrders={successPopup} />
        ) : (
          <div className="multi-step-form">
            {step === 1 && <PersonalDetails formData={formData} handleChange={handleChange} nextStep={nextStep} userLoggedIn={userLoggedIn} />}
            {step === 2 && <ContactDetails formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} userLoggedIn={userLoggedIn} />}
            {step === 3 && <Review formData={formData} setFormData={setFormData} prevStep={prevStep} handleSubmit={handleSubmit} />}
          </div>
        )}
      </div>
      <div className="service-widget mt-48">
            <div className="slider-mb-168">
              <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="3" />
            </div>
            <div className="section-container mb-120">
              <Heading title="Experience Pressto" />
              <div className="section-luxaryExperience-item">
                <div className="exp-item">
                  <h3 className="mobile-only">Locate Store Near you</h3>
                  <div className="img-container">
                    <Image
                      urlEndpoint="https://www.presstoindia.com/media/exp/"
                      src="exp-6.jpg"
                      width={416}
                      height={416}
                      alt="exp6"
                    />
                  </div>
                  <div className="exp-content">
                    <h3 className="desktop-only">Locate Store Near you</h3>
                    <p>Find your nearest Pressto and step into effortless, premium care</p>
                    <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToStoretPage}>Find Now</div>
                  </div>
                </div>
                <div className="exp-item">
                  <h3 className="mobile-only">Pickup & Drop</h3>
                  <div className="img-container">
                    <Image
                      urlEndpoint="https://www.presstoindia.com/media/exp/"
                      src="exp-7.jpg"
                      width={416}
                      height={416}
                      alt="exp7"
                    />
                  </div>
                  <div className="exp-content">
                    <h3 className="desktop-only">Pickup & Drop</h3>
                    <p>Schedule a pickup and let premium care come to you.</p>
                    <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToBookNowPage}>Book an Appointment</div>
                  </div>
                </div>
              </div>
            </div>  
          </div>
      </div>
     );
   };

export default BookNow;

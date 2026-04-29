// src/pages/BookNow.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import PersonalDetails from './multiStepsForm/PersonalDetails';
import ContactDetails from './multiStepsForm/ContactDetails';
import Review from './multiStepsForm/Review';
import SuccessMessage from './multiStepsForm/SuccessMessage';
import { setCustomer } from '../redux/slices/customerSlice';
import {show, hide } from "../redux/slices/uiSlice";
import './BookNow.scss';
import Heading from './common/Heading';
import Experties from './Experties';
import { expertiseData } from '../api/expertiseData';
import { Image } from '@imagekit/react';
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import config from '../config/env';

const { siteApiBaseUrl } = config;

const BookNow = () => {
  const dispatch = useDispatch();
  const openBookNow = useSelector((state) => state.sheet.openBookNow);
  const bookNowCloseType = useSelector((state) => state.sheet.bookNowCloseType);

  const latestFormDataRef = useRef({});
  const isSubmittedRef = useRef(false);
  const prevOpenRef = useRef(openBookNow);

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);
  const [orderResponse, setOrderResponse] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', contact: '',
    city: '', pincode: '', address: '',
    pickupDate: '', pickupTime: '',
    serviceCounts: {}, instructions: '',
    customerUniqueId: '', isAvailableOnFabklean: false
  });

  const [errors, setErrors] = useState({});

  // On mount, check if user is logged in
  useEffect(() => {
    const customer = JSON.parse(localStorage.getItem("customer"));
    if (customer && customer.customerId) {
      setFormData(prev => ({
        ...prev,
        firstName: customer.firstName || '',
        lastName: customer.lastName || '',
        email: customer.email || '',
        contact: customer.mobile || '',
        address: customer.address || '',
        pincode: customer.pincode || '',
        customerUniqueId: customer.customerUniqueId || '',
        isAvailableOnFabklean: customer.isAvailableOnFabklean || false
      }));
      setUserLoggedIn(true);
      setStep(2); // Skip to step 2 if logged in
      dispatch(setCustomer(customer));
    }
  }, [dispatch]);

  useEffect(() => {
    latestFormDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  // Track closure without submission via dataLayer
  useEffect(() => {
    const wasOpen = prevOpenRef.current;
    prevOpenRef.current = openBookNow;

    if (wasOpen && !openBookNow && bookNowCloseType === 'manual') {
      if (!isSubmittedRef.current) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "manual_close",
          form_step: step
        });
      }
    }
  }, [openBookNow, bookNowCloseType, step]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePhone = contact => /^\d{10}$/.test(contact);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.contact.trim()) newErrors.contact = 'Phone is required';
      else if (!validatePhone(formData.contact)) newErrors.contact = 'Phone must be 10 digits';
    } else if (step === 2) {
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.pickupDate) newErrors.pickupDate = 'Pickup date is required';
      if (!formData.pickupTime) newErrors.pickupTime = 'Pickup time is required';
    } else if (step === 3) {
      const hasService = Object.values(formData.serviceCounts || {}).some(count => count > 0);
      if (!hasService) {
        toast.error('Please select at least one service.', { autoClose: 2500 });
        return false;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach(msg => toast.error(msg, { autoClose: 2500 }));
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  // Login or register user
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

      let finalCustomerData = null;

      if (loginData?.customerId) {
        finalCustomerData = {
          customerId: loginData.customerId,
          firstName: loginData.firstName || '',
          lastName: loginData.lastName || '',
          email: loginData.email || '',
          mobile: loginData.contact || '',
          pincode: loginData.pincode || '',
          address: loginData.address || '',
          customerUniqueId: loginData.customerUniqueId || '',
          isAvailableOnFabklean: loginData.IsAvilableOnFebklean === "true" || loginData.IsAvilableOnFebklean === true
        };
      } else {
        // Register API if login failed
        const registerResponse = await fetch(
          `${siteApiBaseUrl}/authApi.php?action=register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          }
        );

        let registerData = await registerResponse.json();

        if (registerData && !registerData.error) {
          const secondLoginResponse = await fetch(
            `${siteApiBaseUrl}/authApi.php?action=login&mobile=${formData.contact}`
          );
          loginData = await secondLoginResponse.json();
          if (loginData?.customerId) {
            finalCustomerData = {
              customerId: loginData.customerId,
              firstName: loginData.firstName || '',
              lastName: loginData.lastName || '',
              email: loginData.email || '',
              mobile: loginData.contact || '',
              pincode: loginData.pincode || '',
              address: loginData.address || '',
              customerUniqueId: loginData.customerUniqueId || '',
              isAvailableOnFabklean: loginData.IsAvilableOnFebklean === "true" || loginData.IsAvilableOnFebklean === true
            };
          }
        } else {
          toast.error(registerData.message || "Failed to register user", { autoClose: 2500 });
          return false;
        }
      }

      if (finalCustomerData) {
        localStorage.setItem("customer", JSON.stringify(finalCustomerData));
        dispatch(setCustomer(finalCustomerData));

        // If not on Fabklean, create user there
        if (!finalCustomerData.isAvailableOnFabklean) {
          console.log("User not on Fabklean, attempting to create...");
          try {
            const createRes = await fetch(`${siteApiBaseUrl}/bookingApi.php?action=createUser`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...formData, ...finalCustomerData })
            });
            const createData = await createRes.json();
            console.log("Fabklean create response:", createData);
            
            // If user already exists in Fabklean, it's fine to proceed
            if (createData?.error && createData.error !== "Client Exists with this phone Number") {
              console.error("Fabklean user creation error:", createData.error);
            } else {
              // Successfully created or already exists, we can update local state
              finalCustomerData.isAvailableOnFabklean = true;
              localStorage.setItem("customer", JSON.stringify(finalCustomerData));
              dispatch(setCustomer(finalCustomerData));
            }
          } catch (e) {
            console.error("Failed to call createUser API:", e);
          }
        }

        setFormData(prev => ({ ...prev, ...finalCustomerData }));
        setUserLoggedIn(true);
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      toast.error("Error during login/register", { autoClose: 2500 });
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    dispatch(show());
    try {
      const loggedIn = await handleUserLoginOrRegister();
      if (!loggedIn) {
        dispatch(hide());
        return;
      }

      // Latest customer data
      const currentCustomer = JSON.parse(localStorage.getItem("customer"));
      const submissionData = { ...formData, ...currentCustomer };

      // 1. Schedule Pickup
      const pickupResponse = await fetch(`${siteApiBaseUrl}/bookingApi.php?action=schedulePickup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });
      const pickupResult = await pickupResponse.json();
      setOrderResponse(pickupResult);

      setSuccessPopup(true);
      setIsSubmitted(true);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "form_submitted",
        form_step: step,
        message: "thank_you",
        orderId: pickupResult.orderIdStr || pickupResult.orderId
      });

      setFormData({
        firstName: "", lastName: "", email: "", contact: "",
        city: "", address: "", pincode: "",
        pickupDate: "", pickupTime: "",
        serviceCounts: {}, instructions: "",
        customerUniqueId: '', isAvailableOnFabklean: false
      });
      dispatch(hide());
    } catch (error) {
      dispatch(hide());
      toast.error("Error submitting form: " + error.message, { autoClose: 3000 });
    }
  }; 

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async position => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const city = data.address.city || data.address.town || data.address.village || '';
          const address = data.display_name;
          setFormData(prev => ({ ...prev, city, address }));
        } catch (err) {
          toast.error('Failed to fetch address.');
        }
      });
    } else {
      toast.error('Geolocation not supported.');
    }
  };

  const navigate = useNavigate();
  const goToStoretPage = () => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
          event: "book_now_popup_locate_store_btn_click",
          event_type:"redirection_to_store"
      });
      navigate('/store');
      dispatch(setOpenBookNow(false))
  };
  const goToBookNowPage = () => {
     dispatch(setOpenBookNow(true));
  };


  return (
    <div className="booknowsheet">
      <div className="sheetTitle">BOOK SERVICE</div>
      <div className="section-container">
        {isSubmitted ? (
          <SuccessMessage
            orderResponse={orderResponse}
          />
        ) : (
          <div className="multi-step-form">
            {step === 1 && <h2 className="stepTitle">Personal Details</h2>}
            {step === 2 && <h2 className="stepTitle">Address Details</h2>}
            {step === 3 && <h2 className="stepTitle">Choose Service</h2>}

            <div className="step-indicator">
              <div className={step === 1 ? 'active' : ''}></div>
              <div className={step === 2 ? 'active' : ''}></div>
              <div className={step === 3 ? 'active' : ''}></div>
            </div>

            {step === 1 && (
              <PersonalDetails
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                userLoggedIn={userLoggedIn}
              />
            )}

            {step === 2 && (
              <ContactDetails
                formData={formData}
                handleChange={handleChange}
                nextStep={nextStep}
                prevStep={prevStep}
                errors={errors}
                userLoggedIn={userLoggedIn}
                handleLocate={handleLocate}
              />
            )}

            {step === 3 && (
              <Review
                formData={formData}
                setFormData={setFormData}
                prevStep={prevStep}
                handleSubmit={handleSubmit}                
              />
            )}
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

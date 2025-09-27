// src/pages/BookNow.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import PersonalDetails from './multiStepsForm/PersonalDetails';
import ContactDetails from './multiStepsForm/ContactDetails';
import Review from './multiStepsForm/Review';
import SuccessMessage from './multiStepsForm/SuccessMessage';
import { setCustomer } from '../redux/slices/customerSlice';
import {show, hide } from "../redux/slices/uiSlice";
import emailjs from "emailjs-com";
import './BookNow.scss';
import Heading from './common/Heading';
import Experties from './Experties';
import { expertiseData } from '../api/expertiseData';
import { Image } from '@imagekit/react';
import { setOpenBookNow } from "../redux/slices/sheetSlice";

const BookNow = () => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', contact: '',
    city: '', pincode: '', address: '',
    pickupDate: '', pickupTime: '',
    serviceCounts: {}, instructions: ''
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
        pincode: customer.pincode || ''
      }));
      setUserLoggedIn(true);
      dispatch(setCustomer(customer));
    }
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateEmail = email => /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
  const validatePhone = contact => /^\d{10}$/.test(contact);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
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
      `https://uat.presstoindia.com/authApi.php?action=login&mobile=${formData.contact}`
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
      "https://uat.presstoindia.com/authApi.php?action=register",
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
        `https://uat.presstoindia.com/authApi.php?action=login&mobile=${formData.contact}`
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

  const handleSubmit = async () => {
    if (!validateStep()) return;
    dispatch(show());
    try {
      await handleUserLoginOrRegister();
      localStorage.setItem("formData", JSON.stringify(formData));
      await emailjs.send(
        "service_r4xqjrl", 
        "template_57923u2", 
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          city: formData.city,
          address: formData.address,
          pickupDate: formData.pickupDate,
          pickupTime: formData.pickupTime,
          serviceCounts: JSON.stringify(formData.serviceCounts),
          instructions: formData.instructions,
        },
        "cawbEAs7EEHSVWlQI" 
      );
      setSuccessPopup(true);
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        pickupDate: "",
        pickupTime: "",
        serviceCounts: {},
        instructions: "",
      });
      dispatch(hide());
    } catch (error) {
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
      navigate('/store');
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
            showGoToOrders={successPopup}
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
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
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
                    urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
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

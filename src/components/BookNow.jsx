// src/pages/BookNow.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import PersonalDetails from './multiStepsForm/PersonalDetails';
import ContactDetails from './multiStepsForm/ContactDetails';
import Review from './multiStepsForm/Review';
import SuccessMessage from './multiStepsForm/SuccessMessage';
import { setCustomer } from '../redux/slices/customerSlice';
import Heading from './common/Heading';
import './BookNow.scss';

const BookNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
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
        phone: customer.mobile || '',
        city: customer.city || '',
        pincode: customer.pincode || '',
        address: customer.address || ''
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
  const validatePhone = phone => /^\d{10}$/.test(phone);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!validatePhone(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
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
      `https://uat.presstoindia.com/authApi.php?action=login&mobile=${formData.phone}`
    );

    let loginData = {};
    try {
      loginData = await loginResponse.json();
    } catch {
      loginData = {};
    }

    if (loginData.success) {
      const customer = {
        customerId: loginData.customerId,
        firstName: loginData.firstName || '',
        lastName: loginData.lastName || '',
        email: loginData.email || '',
        mobile: loginData.mobile || '',
        city: loginData.city || '',
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

    if (registerData.success) {
      const customer = {
        customerId: registerData.customerId,
        firstName: registerData.firstName || '',
        lastName: registerData.lastName || '',
        email: registerData.email || '',
        mobile: registerData.mobile || '',
        city: registerData.city || '',
        pincode: registerData.pincode || '',
        address: registerData.address || '',
        customerUniqueId: registerData.customerUniqueId || ''
      };
      localStorage.setItem("customer", JSON.stringify(customer));
      dispatch(setCustomer(customer));
      setFormData(prev => ({ ...prev, ...customer }));
      setUserLoggedIn(true);
      return false; // Newly registered
    }

    toast.error(registerData.message || "Failed to register user");
    return false;

    } catch (err) {
      console.error(err);
      toast.error("Error during login/register");
      return false;
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      await handleUserLoginOrRegister();
      localStorage.setItem("formData", JSON.stringify(formData));
      setSuccessPopup(true);
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Error submitting form: " + error.message, { autoClose: 3000 });
    }
  };

  return (
    <div className="booknowsheet mt-5">
      <div className="section-container">
        <Heading title="BOOK SERVICE" />

        {isSubmitted ? (
          <SuccessMessage
            showGoToOrders={successPopup}
            onGoToOrders={() => navigate("/profile")}
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
    </div>
  );
};

export default BookNow;

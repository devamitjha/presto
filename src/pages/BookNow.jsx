// src/pages/BookNow.jsx
import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import PersonalDetails from '../components/multiStepsForm/PersonalDetails';
import ContactDetails from '../components/multiStepsForm/ContactDetails';
import Review from '../components/multiStepsForm/Review';
import SuccessMessage from '../components/multiStepsForm/SuccessMessage';
import { toast } from 'react-toastify';
import "./BookNow.scss";
import Experties from '../components/Experties';
import SixColumnlayoutCenter from '../components/SixColumnlayoutCenter';
import { expertiseData } from '../api/expertiseData';
import { useNavigate } from 'react-router';

//services 
import Exp6 from "../assets/images/exp/exp-6.jpg";
import Exp7 from "../assets/images/exp/exp-7.jpg";
import whatwedo3 from "../assets/images/contact/whatwedo1.jpg";
import whatwedo4 from "../assets/images/contact/whatwedo1.jpg";
import Heading from '../components/common/Heading';
import { Button } from '../components/common/Button';

const HelmetMeta = () => (
  <Helmet>
    <title>Book Now</title>
    <meta name="description" content="Learn more about our company and mission." />
    <meta name="keywords" content="about us, company, mission, values" />
    <link rel="canonical" href="https://www.yoursite.com" />
  </Helmet>
);

const BookNow = () => {
  const navigate = useNavigate();
  const goToStoretPage = () => {
      navigate('/store');
  };
  const goToBookNowPage = () => {
      navigate('/book-now');
  };
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    city: '', address: '',
    pickupDate: '', pickupTime: '',
    serviceCounts: {}, instructions: ''
  });
  const [errors, setErrors] = useState({});

  const validateEmail = email => /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email);
  const validatePhone = phone => /^\d{10}$/.test(phone);

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!validatePhone(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    } else if (step === 2) {
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      else if (/[^a-zA-Z0-9\s,.-]/.test(formData.address)) newErrors.address = 'Address contains invalid characters';
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

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  const handleSubmit = async () => {
    if (!validateStep()) return;

    try {
      localStorage.setItem('formData', JSON.stringify(formData));
      // const response = await fetch('https://example.com/api/submit-form', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error('Submission failed');

      toast.success('Form submitted successfully!', { position: 'top-center', autoClose: 3000 });
      setIsSubmitted(true);
      setFormData({
        name: '', email: '', phone: '',
        city: '', address: '',
        pickupDate: '', pickupTime: '',
        serviceCounts: {}, instructions: ''
      });
      setStep(1);
    } catch (error) {
      toast.error('Error submitting form: ' + error.message, { position: 'top-center', autoClose: 3000 });
    }
  };

  return (
    <div className="book-now-page mt-5">
      <HelmetMeta />
      <div className="section-container">
        <Heading title="BOOK SERVICE" />
        <div className="multi-step-form">
          {step === 1 && <h2 className="stepTitle">Personal Details</h2>}
          {step === 2 && <h2 className="stepTitle">Address Details</h2>}
          {step === 3 && <h2 className="stepTitle">Choose Service</h2>}
          <div className="step-indicator">
            <div className={step === 1 ? 'active' : ''}></div>
            <div className={step === 2 ? 'active' : ''}></div>
            <div className={step === 3 ? 'active' : ''}></div>
          </div>
          {isSubmitted ? (
            <SuccessMessage />
          ) : (
            <>
              {step === 1 && (
                <PersonalDetails formData={formData} handleChange={handleChange} nextStep={nextStep} errors={errors} />
              )}
              {step === 2 && (
                <ContactDetails formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} errors={errors} handleLocate={handleLocate} />
              )}
              {step === 3 && (
                <Review formData={formData} setFormData={setFormData} prevStep={prevStep} handleSubmit={handleSubmit} />
              )}
            </>
          )}
        </div>
        <Experties title="Timeless Care, Unmatched Expertise" data={expertiseData} item="4" />
        <div className="section-container">
          <Heading title="Experience Pressto" />
          <div className="section-luxaryExperience-item">
            <div className="exp-item">
              <div className="img-container">
                <img src={Exp6} alt="exp6" width="416" height="416" />
              </div>
              <div className="exp-content">
                <h3>Locate Store Near you</h3>
                <p>Find your nearest Pressto and step into effortless, premium care</p>
                <Button title="Find Now" className="btn btn-md base-btn secondary overflowHidden" GoTo={goToStoretPage}/>
              </div>
            </div>
            <div className="exp-item">
              <div className="img-container">
                <img src={Exp7} alt="exp7" width="416" height="416" />
              </div>
              <div className="exp-content">
                <h3>Pickup & Drop</h3>
                <p>Schedule a pickup and let premium care come to you.</p>
                <Button title="Book an Appointment" className="btn btn-md base-btn secondary overflowHidden" GoTo={goToBookNowPage}/>
              </div>
            </div>
          </div>
        </div>
        <SixColumnlayoutCenter image={[whatwedo3, whatwedo4]} />
      </div>
    </div>
  );
};

export default BookNow;

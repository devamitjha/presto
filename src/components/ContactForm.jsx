import React, { useState } from "react";
import emailjs from "emailjs-com";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // simple validation
  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    emailjs
      .send(
        "service_r4xqjrl", 
        "template_sx77lx5", 
        {
          fullName: formData.fullName,
          email: formData.email,
        },
        "cawbEAs7EEHSVWlQI" 
      )
      .then(
        () => {
          toast.success("✅ Message sent successfully!");
          setFormData({ fullName: "", email: "" });
        },
        (error) => {
          toast.error("❌ Failed to send. Try again later.");
          console.error("EmailJS Error:", error);
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="item contact-form">
      <h2>Contact Us</h2>
      <p>Subscribe and be the first one to know our new updates</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Your Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "CONNECT NOW"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;

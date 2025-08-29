import React from 'react';
import "./Footer.scss"
import { Link } from 'react-router';
import {
  Facebook,
  Instagram,
  LinkedinIcon,
  Youtube,
} from "lucide-react";
import logoBw from "../assets/images/footer-logo.png"
import { useLocation } from 'react-router';

const Footer = () => {
  const { pathname } = useLocation();
  return (
    <div className={`footer ${pathname === "/store" ? "store-footer" : ""}`}>
      <div className="item social">
        <img className="logo" src={logoBw } alt="logobw"/>
          <p className="follow-label">FOLLOW US</p>
          <div className="social-icons">
            <Facebook 
              onClick={() => {
                const url = `https://www.facebook.com/Pressto.India`;
                window.open(url, "_blank");
              }}
            />
            <Instagram 
              onClick={() => {
                const url = `https://www.instagram.com/presstoindia/`;
                window.open(url, "_blank");
              }}
            />
            <LinkedinIcon 
              onClick={() => {
                const url = `https://www.linkedin.com/company/104093627/admin/dashboard/`;
                window.open(url, "_blank");
              }}
            />
            <Youtube 
              onClick={() => {
                const url = `https://www.youtube.com/@presstoindia7210`;
                window.open(url, "_blank");
              }}
            />
          </div>
          <p className="copyright">
            © {new Date().getFullYear()}{" "}
            <a href="https://www.presstoindia.com" target="_blank" rel="noopener noreferrer">
              presstoindia.com
            </a>{" "}
            ALL RIGHTS RESERVED.
          </p>
      </div>
      <div className="item category">
        <Link to="/">Home</Link>
        <Link to="/service/dry-cleaning">Services</Link>
        <Link to="/blog">Case Studies & Blogs</Link>
        <Link to="/about">About us</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
      <div className="item contact-form">
          <h2>Contact Us</h2>
          <p>Subscribe and be the first one to know our new updates</p>
          <form>
            <input type="text" placeholder="Your Full Name" />
            <input type="email" placeholder="Your Email Address" />
            <button type="submit">CONNECT NOW</button>
          </form>
      </div>
    </div>
  )
}

export default Footer

import React from 'react';
import "./Footer.scss"
import { Link } from 'react-router';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import logoBw from "../assets/images/footer-logo.png"

const Footer = () => {
  return (
    <div className="footer">
      <div className="item social">
        <img className="logo" src={logoBw } alt="logobw"/>
          <p className="follow-label">FOLLOW US</p>
          <div className="social-icons">
            <Facebook />
            <Instagram />
            <Twitter />
            <Youtube />
          </div>
          <p className="copyright">
            © 202s WEBSITE.COM ALL RIGHTS RESERVED.
          </p>
      </div>
      <div className="item category">
        <Link to="/">Home</Link>
        <Link to="/">Services</Link>
        <Link to="/">Case Studies & Blogs</Link>
        <Link to="/">About us</Link>
        <Link to="/">Contact Us</Link>
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

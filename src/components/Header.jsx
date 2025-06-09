import React from 'react';
import { NavLink, Link } from 'react-router';
import { ButtonWithIcon } from "./common/Button";
import "./Header.scss";
import Logo from "../assets/images/logo.png"

const ContactIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.3 12C9.91111 12 8.53889 11.6972 7.18333 11.0917C5.82778 10.4861 4.59444 9.62778 3.48333 8.51667C2.37222 7.40556 1.51389 6.17222 0.908333 4.81667C0.302778 3.46111 0 2.08889 0 0.7C0 0.5 0.0666667 0.333333 0.2 0.2C0.333333 0.0666667 0.5 0 0.7 0H3.4C3.55556 0 3.69444 0.0527778 3.81667 0.158333C3.93889 0.263889 4.01111 0.388889 4.03333 0.533333L4.46667 2.86667C4.48889 3.04444 4.48333 3.19444 4.45 3.31667C4.41667 3.43889 4.35556 3.54444 4.26667 3.63333L2.65 5.26667C2.87222 5.67778 3.13611 6.075 3.44167 6.45833C3.74722 6.84167 4.08333 7.21111 4.45 7.56667C4.79444 7.91111 5.15556 8.23056 5.53333 8.525C5.91111 8.81944 6.31111 9.08889 6.73333 9.33333L8.3 7.76667C8.4 7.66667 8.53056 7.59167 8.69167 7.54167C8.85278 7.49167 9.01111 7.47778 9.16667 7.5L11.4667 7.96667C11.6222 8.01111 11.75 8.09167 11.85 8.20833C11.95 8.325 12 8.45556 12 8.6V11.3C12 11.5 11.9333 11.6667 11.8 11.8C11.6667 11.9333 11.5 12 11.3 12Z" />
  </svg>
);

const BookNowIcon = (
  <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99935 14.333L1.19935 10.733C1.03268 10.6108 0.902127 10.4552 0.807682 10.2663C0.713238 10.0775 0.666016 9.87745 0.666016 9.66634V1.66634C0.666016 1.29967 0.796571 0.985786 1.05768 0.724675C1.31879 0.463563 1.63268 0.333008 1.99935 0.333008H9.99935C10.366 0.333008 10.6799 0.463563 10.941 0.724675C11.2021 0.985786 11.3327 1.29967 11.3327 1.66634V9.66634C11.3327 9.87745 11.2855 10.0775 11.191 10.2663C11.0966 10.4552 10.966 10.6108 10.7993 10.733L5.99935 14.333ZM5.99935 12.6663L9.99935 9.66634V1.66634H1.99935V9.66634L5.99935 12.6663ZM5.29935 8.99967L9.06602 5.23301L8.13268 4.26634L5.29935 7.09968L3.89935 5.69967L2.93268 6.63301L5.29935 8.99967Z" />
  </svg>
);

const Header = () => {
  return (
    <section className="header">
      <div className="navigation">
        <div className="section-logo">
          <Link to="/">
            <img src={Logo} alt="pressto" width="170px" height="37px"/>
          </Link>
        </div>
        <div className="section-nav">
          <nav>
            <ul>
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about" end>About Us</NavLink></li>
              <li><NavLink to="/store" end>Stores</NavLink></li>
              <li><NavLink to="/service" end>Services</NavLink></li>
              <li><NavLink to="/blog" end>Blog</NavLink></li>
            </ul>
          </nav>
        </div>
        <div className="section-contact">
          <ButtonWithIcon title="Contact Us" icon={ContactIcon} className="btn btn-md base-btn outlined overflowHidden" />
          <ButtonWithIcon title="Book Now" icon={BookNowIcon} className="btn btn-md base-btn secondary overflowHidden"/>
        </div>
      </div>
    </section>
  )
}

export default Header

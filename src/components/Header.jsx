import React, { useState } from "react";
import { NavLink, Link, useNavigate } from 'react-router';
import { motion, useScroll, useTransform } from "framer-motion";
import "./Header.scss";
import Logo from "../assets/images/logo.png";
import whatsApp from "../assets/images/whatsapp.png";
import { User } from 'lucide-react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import Authorization from "./Authorization";
import BookNow from "./BookNow";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSheet, setOpenBookNow } from "../redux/slices/sheetSlice";

const BookNowIcon = () => (
  <svg width="12" height="15" viewBox="0 0 12 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.99935 14.333L1.19935 10.733C1.03268 10.6108 0.902127 10.4552 0.807682 10.2663C0.713238 10.0775 0.666016 9.87745 0.666016 9.66634V1.66634C0.666016 1.29967 0.796571 0.985786 1.05768 0.724675C1.31879 0.463563 1.63268 0.333008 1.99935 0.333008H9.99935C10.366 0.333008 10.6799 0.463563 10.941 0.724675C11.2021 0.985786 11.3327 1.29967 11.3327 1.66634V9.66634C11.3327 9.87745 11.2855 10.0775 11.191 10.2663C11.0966 10.4552 10.966 10.6108 10.7993 10.733L5.99935 14.333ZM5.99935 12.6663L9.99935 9.66634V1.66634H1.99935V9.66634L5.99935 12.6663ZM5.29935 8.99967L9.06602 5.23301L8.13268 4.26634L5.29935 7.09968L3.89935 5.69967L2.93268 6.63301L5.29935 8.99967Z" />
  </svg>
);

const Header = () => {
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);
  const { openSheet, openBookNow } = useSelector((state) => state.sheet);
  const navigate = useNavigate();
  const initials = `${customer?.firstName?.charAt(0) || ""}${customer?.lastName?.charAt(0) || ""}`.toUpperCase();

  // Track scroll progress
  const { scrollY } = useScroll();

  // Control opacity between 0 and 1 from scroll 0 to 100px
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  // Derived styles
  const bgColor = useTransform(bgOpacity, (o) => `rgba(255, 255, 255, ${o})`);
  const boxShadow = useTransform(
    bgOpacity,
    (o) => `0 2px 10px rgba(0,0,0,${o * 0.1})`
  );

  const goToBookNowPage = () => {
    dispatch(setOpenBookNow(true));
  };

  return (
    <motion.section
      className="header sticky-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 2,
        backgroundColor: bgColor,
        boxShadow: boxShadow,
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="navigation">
        <div className="section-logo">
          <Link to="/">
            <img src={Logo} alt="pressto" width="170px" height="37px" />
          </Link>
        </div>
        <div className="section-nav">
          <nav>
            <ul>
              <li><NavLink to="/" end>Home</NavLink></li>
              <li><NavLink to="/about" end>About Us</NavLink></li>
              <li><NavLink to="/store" end>Stores</NavLink></li>
              <li><NavLink to="/service/dry-cleaning" end>Services</NavLink></li>
              <li><NavLink to="/blog" end>Blog</NavLink></li>
              <li><NavLink to="/contact" end>Contact Us</NavLink></li>
            </ul>
          </nav>
        </div>
        <div className="section-contact">
          {
            customer ? 
              <div className="user-dropdown">
                <div className="user-icon" onClick={() => navigate("/profile")}>
                  {initials}
                </div>           
              </div>
              :
              <div className="user-dropdown">
                <div className="user-icon" onClick={() => dispatch(setOpenSheet(true))}>
                  <User />
                </div>           
              </div>
          }
          
           <div className="user-icon" 
              onClick={() => {
                const phone = "9167188355";
                const message = encodeURIComponent("Let's Start!");
                const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
                window.open(url, "_blank");
              }}
              style={{ cursor: "pointer" }}
            >
              <img src={whatsApp} alt="whatsapp" />
            </div>
          <div className="btn btn-md base-btn primary black" onClick={goToBookNowPage} >
            Book Now
            <div className="icon-box">
              <BookNowIcon />
            </div>
          </div>
        </div>
      </div>

      <BottomSheet
        open={openSheet}
        onDismiss={() => dispatch(setOpenSheet(false))}
        defaultSnap={({ snapPoints, lastSnap }) =>
            lastSnap ?? Math.min(...snapPoints)
        }
        className="auth-bottom-sheet"
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <Authorization/>
        </div>
      </BottomSheet>

       <BottomSheet
        open={openBookNow}
        onDismiss={() => dispatch(setOpenBookNow(false))}
        defaultSnap={({ snapPoints, lastSnap }) =>
            lastSnap ?? Math.min(...snapPoints)
        }
        className="auth-bottom-sheet"
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <BookNow/>
        </div>
      </BottomSheet>


    </motion.section>
  );
};

export default Header;

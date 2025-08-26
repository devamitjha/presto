import React from "react";
import { NavLink, Link, useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setOpenSheet, setOpenBookNow } from "../redux/slices/sheetSlice";
import Logo from "../assets/images/logo.png";
import whatsApp from "../assets/images/whatsapp.png";
import BookNowIcon from "./BookNowIcon";

const DesktopHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);

  const initials = `${customer?.firstName?.charAt(0) || ""}${
    customer?.lastName?.charAt(0) || ""
  }`.toUpperCase();

  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
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
        zIndex:2,
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
              <li>
                <NavLink to="/" end>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" end>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/store" end>
                  Stores
                </NavLink>
              </li>
              <li>
                <NavLink to="/service/dry-cleaning" end>
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" end>
                  Blog
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" end>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="section-contact">
          {customer ? (
            <div className="user-dropdown">
              <div className="user-icon" onClick={() => navigate("/profile")}>
                {initials}
              </div>
            </div>
          ) : (
            <div className="user-dropdown">
              <div
                className="user-icon"
                onClick={() => dispatch(setOpenSheet(true))}
              >
                <User />
              </div>
            </div>
          )}

          <div
            className="user-icon"
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
          <div
            className="btn btn-md base-btn primary black"
            onClick={goToBookNowPage}
          >
            Book Now
            <div className="icon-box">
              <BookNowIcon />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default DesktopHeader;

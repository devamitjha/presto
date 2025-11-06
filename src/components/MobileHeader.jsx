import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Menu } from "lucide-react";
import Logo from "../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import { setOpenSheet, setOpenBookNow } from "../redux/slices/sheetSlice";
import { User } from "lucide-react";
import whatsApp from "../assets/images/whatsapp.png";
import BookNowIcon from "./BookNowIcon";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customer.customer);

  const initials = `${customer?.firstName?.charAt(0) || ""}${
    customer?.lastName?.charAt(0) || ""
  }`.toUpperCase();

   useEffect(() => {
        if (isOpen) {
        document.body.style.overflow = "hidden";
        } else {
        document.body.style.overflow = "auto";
        }
        return () => {
        document.body.style.overflow = "auto"; // cleanup
        };
    }, [isOpen]);

    const goToBookNowPage = () => {
      dispatch(setOpenBookNow(true));
    };

  return (
    <>
      <div className="mobile-header navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm mb-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="section-logo">
            <Link to="/">
              <img src={Logo} alt="pressto" width="120px" />
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-end gap-2">
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
                    <User size={18} />
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
            <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToBookNowPage}>Book Now</div>
            <span className="menu-icon" onClick={() => setIsOpen(true)}>
              <Menu />
            </span>
          </div>
        </div>
      </div>

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default MobileHeader;

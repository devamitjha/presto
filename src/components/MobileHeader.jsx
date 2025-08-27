import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Menu } from "lucide-react";
import Logo from "../assets/images/logo.png";
import MobileIcon from "../assets/mobile/phone.svg";
import Sidebar from "./Sidebar";

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      <div className="mobile-header navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm mb-3">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="section-logo">
            <Link to="/">
              <img src={Logo} alt="pressto" width="90px" />
            </Link>
          </div>
          <div className="d-flex align-items-center justify-content-end">
            <img src={MobileIcon} alt="Mobile Phone" />
            <span className="menu-icon ms-4" onClick={() => setIsOpen(true)}>
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

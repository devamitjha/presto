import { useState } from "react";
import { Link, NavLink } from "react-router";
import { X, ChevronRight, Plus, Minus, Dot, Phone } from "lucide-react";
import MobileIcon from "../assets/mobile/phone.svg";
import Logo from "../assets/images/logo.png";
import { Image } from '@imagekit/react';
import BookNowIcon from "./BookNowIcon";
import { useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const [activeMenu, setActiveMenu] = useState(null);    

    const toggleSubmenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };
    const handleClose = () => setIsOpen(false);
    const goToBookNowPage = () => {
        setIsOpen(false)
        dispatch(setOpenBookNow(true));
    };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
         {/* Header */}
            <div className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm mb-1">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                <div className="section-logo">
                    <Link to="/" onClick={handleClose}>
                        <img src={Logo} alt="pressto" width="90px" height="auto" />
                    </Link>
                </div>
                <div className="d-flex align-items-center">
                    <img src={MobileIcon} alt="Mobile Phone" />
                    <span className="menu-icon ms-4" onClick={() => setIsOpen(false)}>
                    <X size={22}/>
                    </span>
                </div>
                </div>
            </div>
        <div className="scrolled-content">
            {/* Menu */}
                <div className="menu">
                    <NavLink to="/" className="menu-item d-flex justify-content-between align-items-center" end onClick={handleClose}>
                    Home <ChevronRight size={16} />
                    </NavLink>
                    <NavLink to="/about" className="menu-item d-flex justify-content-between align-items-center" end onClick={handleClose}>
                    About Us <ChevronRight size={16} />
                    </NavLink>
                    <NavLink to="/store" className="menu-item d-flex justify-content-between align-items-center" end onClick={handleClose}>
                    Stores <ChevronRight size={16} />
                    </NavLink>

                    {/* Service with toggle */}
                    <div
                    className={`menu-item ${activeMenu === "service" ? "selected" : ""}`}
                    onClick={() => toggleSubmenu("service")}
                    >
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <span>Service</span>
                        {activeMenu === "service" ? <Minus size={16}/> : <Plus size={16}/>}
                    </div>

                    {activeMenu === "service" && (
                        <div className="submenu ps-3 mt-2">
                        <NavLink to="/service/dry-cleaning" className="d-block my-2" end onClick={handleClose}><Dot /> Drycleaning & Laundry</NavLink>
                        <NavLink to="/service/shoes-and-bag-restoration" className="d-block mb-2" end onClick={handleClose}><Dot />Shoe & Bag Care</NavLink>
                        </div>
                    )}
                    </div>
                    <NavLink to="/blog" className="menu-item d-flex justify-content-between align-items-center" end onClick={handleClose}>
                    Blogs <ChevronRight size={16} />
                    </NavLink>
                    <NavLink to="/contact" className="menu-item d-flex justify-content-between align-items-center" end onClick={handleClose}>
                    Contact Us <ChevronRight size={16} />
                    </NavLink>
                </div>
                {/* Services */}
                <div className="container-fluid service-section">
                    <div className="menu-service">Avail our Services</div>
                    <div className="row">
                        <div className="flex flex-column justify-content-start mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center s-item">
                                    <Image
                                        urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
                                        src="exp-6.jpg"
                                        width={70}
                                        height={70}
                                        alt="exp6"
                                    />
                                    <div className="sidebar-service ms-3">
                                        <div className="title">Locate Store Near you</div>
                                        <p>Find your nearest Pressto and step into effortless, premium care</p>
                                    </div>
                                </div>  
                                <ChevronRight size={16} />
                            </div>  
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center s-item">
                                    <Image
                                        urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
                                        src="exp-6.jpg"
                                        width={70}
                                        height={70}
                                        alt="exp6"
                                    />
                                    <div className="sidebar-service ms-3">
                                        <div>Locate Store Near you</div>
                                        <p>Find your nearest Pressto and step into effortless, premium care</p>
                                    </div>
                                </div>  
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="abs-btn text-center p-3 bg-white border-top d-flex justify-content-between align-items-center">
                    <div className="icon-btn contact-btn">
                        <span>Contact Us</span>
                        <Phone size={16}/>            
                    </div>
                    <div className="icon-btn book-now" onClick={goToBookNowPage}>
                        <span>Book Now</span>
                        <BookNowIcon />                
                    </div>
                </div>
        </div>
    </div>
  );
};

export default Sidebar;

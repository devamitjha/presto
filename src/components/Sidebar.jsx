import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { X, ChevronRight, Plus, Minus, Dot } from "lucide-react";
import Logo from "../assets/images/logo.png";
import LogoutBtn from "../assets/images/logout.svg";
import { Image } from '@imagekit/react';
import { useSelector, useDispatch } from "react-redux";
import { setOpenSheet, setOpenBookNow } from "../redux/slices/sheetSlice";
import { User } from "lucide-react";
import whatsApp from "../assets/images/whatsapp.png";
import { clearCustomer } from '../redux/slices/customerSlice';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const [activeMenu, setActiveMenu] = useState(null);    
    const navigate = useNavigate();
    const customer = useSelector((state) => state.customer.customer);

    const initials = `${customer?.firstName?.charAt(0) || ""}${
        customer?.lastName?.charAt(0) || ""
    }`.toUpperCase();

    const toggleSubmenu = (menu) => {
        setActiveMenu(activeMenu === menu ? null : menu);
    };
    const handleClose = () => setIsOpen(false);
    const goToBookNowPage = () => {
        setIsOpen(false)
        dispatch(setOpenBookNow(true));
    };
    const openLogin = () => {
        setIsOpen(false)
        dispatch(setOpenSheet(true))
    };
    const OpenWhatsapp = ()=>{
        setIsOpen(false)
        const phone = "9167188355";
        const message = encodeURIComponent("Let's Start!");
        const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
        window.open(url, "_blank");
    }
    const logOutCustomer = ()=>{
        dispatch(clearCustomer(customer));
        setIsOpen(false)
    }
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
         {/* Header */}
            <div className="navbar navbar-expand-lg bg-body-tertiary py-3 shadow-sm mb-1">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <div className="section-logo">
                        <Link to="/" onClick={handleClose}>
                            <img src={Logo} alt="pressto" width="120px" height="auto" />
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
                                onClick={openLogin}
                                >
                                <User size={18} />
                                </div>
                            </div>
                            )}
                        
                        <div
                            className="user-icon"
                            onClick={OpenWhatsapp}
                            style={{ cursor: "pointer" }}
                        >
                            <img src={whatsApp} alt="whatsapp" />
                        </div>
                        <div className="btn btn-md base-btn secondary overflowHidden" onClick={goToBookNowPage}>Book Now</div>
                        <span className="menu-icon" onClick={() => setIsOpen(false)}>
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
                        <div className="submenu ps-3">
                            <NavLink to="/service/dry-cleaning" className="d-flex justify-content-start align-items-center item" end onClick={handleClose}><Dot /> <span className="d-flex justify-content-between align-items-center">Drycleaning & Laundry <ChevronRight size={16} /></span></NavLink>
                            <NavLink to="/service/shoes-and-bag-care" className="d-flex justify-content-start align-items-center item" end onClick={handleClose}><Dot /> <span className="d-flex justify-content-between align-items-center">Shoe & Bag Care <ChevronRight size={16} /></span></NavLink>
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
                            <div className="item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center s-item">
                                    <Image
                                        urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
                                        src="exp-6.jpg"
                                        width={70}
                                        height={70}
                                        alt="exp6"
                                    />
                                    <div className="sidebar-service ms-3 pe-2">
                                        <div className="title">Locate Store Near you</div>
                                        <p>Find your nearest Pressto and step into effortless, premium care</p>
                                    </div>
                                </div>  
                                <span className="service-icon"> <ChevronRight size={16} /></span>                               
                            </div>  
                            <div className="item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center s-item">
                                    <Image
                                        urlEndpoint="https://ik.imagekit.io/devamitjha/pressto/exp/"
                                        src="exp-7.jpg"
                                        width={70}
                                        height={70}
                                        alt="exp6"
                                    />
                                    <div className="sidebar-service ms-3 pe-2">
                                        <div className="title">Pickup & Drop</div>
                                        <p>Schedule a pickup and let premium care come to you.</p>
                                    </div>
                                </div>  
                                <span className="service-icon"> <ChevronRight size={16} /></span> 
                            </div>
                        </div>
                    </div>
                </div>
                {
                    customer && 
                    <div className="abs-btn text-center p-3 bg-white border-top d-flex justify-content-between align-items-center">
                        <div className="icon-btn contact-btn" onClick={logOutCustomer}>
                            <span>Logout</span>
                            <img src={LogoutBtn} alt="Logout" />
                        </div>
                    </div>
                }
                
                    
                
        </div>
    </div>
  );
};

export default Sidebar;


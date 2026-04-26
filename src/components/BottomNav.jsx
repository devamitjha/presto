import React from 'react';
import { Home, Package, User, ClipboardList, Wallet } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';
import { setOpenSheet, setOpenBookNow } from '../redux/slices/sheetSlice';
import './BottomNav.scss';

const BottomNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const customer = useSelector((state) => state.customer.customer);

  const navItems = [
    {
      label: 'Home',
      icon: <Home size={20} />,
      onClick: () => navigate('/'),
      isActive: location.pathname === '/',
    },
    {
      label: 'Pick up & Drop',
      icon: <Package size={20} />,
      onClick: () => dispatch(setOpenBookNow(true)),
      isActive: false,
    },
    {
      label: 'Profile',
      icon: <User size={20} />,
      onClick: () => {
        if (customer) {
          navigate('/profile');
        } else {
          dispatch(setOpenSheet(true));
        }
      },
      isActive: location.pathname === '/profile' && !location.search,
    },
    {
      label: 'Orders',
      icon: <ClipboardList size={20} />,
      onClick: () => {
        if (customer) {
          navigate('/profile?tab=orders');
        } else {
          dispatch(setOpenSheet(true));
        }
      },
      isActive: location.search.includes('tab=orders'),
    },
    {
      label: 'Wallet',
      icon: <Wallet size={20} />,
      onClick: () => {
        if (customer) {
          navigate('/profile?tab=wallet');
        } else {
          dispatch(setOpenSheet(true));
        }
      },
      isActive: location.search.includes('tab=wallet'),
    },
  ];

  return (
    <div className="bottom-nav">
      {navItems.map((item, index) => (
        <div
          key={index}
          className={`nav-item ${item.isActive ? 'active' : ''}`}
          onClick={item.onClick}
        >
          <div className="icon">{item.icon}</div>
          <span className="label">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;

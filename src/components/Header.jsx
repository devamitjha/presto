import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import useWindowSize from '../hooks/useWindowSize';
import Authorization from "./Authorization";
import BookNow from "./BookNow";
import { setOpenSheet, setOpenBookNow, closeBookNow } from "../redux/slices/sheetSlice";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import "./Header.scss";
import {X } from 'lucide-react';
import Logo from "../assets/images/logo.png";
import SideSheet from "./sidesheet/SideSheet";

const Header = () => {
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { openSheet, openBookNow } = useSelector((state) => state.sheet);
  useEffect(() => {
    const originalPadding = document.body.style.paddingTop;
    if (width < 1025) {
      document.body.style.paddingTop = "70px";
    } else {
      document.body.style.paddingTop = "0";
    }
    return () => {
      document.body.style.paddingTop = originalPadding; 
    };
  }, [width]);

  return (
    <>
      {width > 1024 ? <DesktopHeader /> : <MobileHeader />}

      {/* Login/Signup Sheet */}
      <BottomSheet
        open={openSheet}
        onDismiss={() => dispatch(setOpenSheet(false))}
        snapPoints={({ maxHeight }) => {
          const isMobile = window.innerWidth <= 768;
          return isMobile
            ? [maxHeight * 0.8, maxHeight * 0.7] 
            : [maxHeight * 0.9, maxHeight * 0.8];
        }}
        className="auth-bottom-sheet"
        header={
          <>
            <div className="sheetHeader"> <img src={Logo} alt="pressto" width="208px" height="46px" /></div>
            <div className="closesheet" onClick={() => dispatch(setOpenSheet(false))}>
              <X size={22}/>
            </div>
          </>
        }
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <Authorization />
        </div>
      </BottomSheet>

      {/* Book Now Sheet */}
      <BottomSheet
        open={openBookNow}
        onDismiss={() => dispatch(closeBookNow('manual'))}
         snapPoints={({ maxHeight }) => {
          const isMobile = window.innerWidth <= 768;
          return isMobile
            ? [maxHeight * 0.8, maxHeight * 0.7] 
            : [maxHeight * 0.9, maxHeight * 0.8];
        }}
        className="booknow-bottomsheet"
        header={
          <>
            <div className="sheetHeader"> <img src={Logo} alt="pressto" width="208px" height="46px" /></div>
            <div className="closesheet" onClick={() => dispatch(closeBookNow('manual'))}>
              <X size={22}/>
            </div>
          </>
        }
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <BookNow />
        </div>
      </BottomSheet>
      <SideSheet />
    </>
  );
};

export default Header;

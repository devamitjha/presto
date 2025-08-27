import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import useWindowSize from '../hooks/useWindowSize';
import Authorization from "./Authorization";
import BookNow from "./BookNow";
import { setOpenSheet, setOpenBookNow } from "../redux/slices/sheetSlice";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import "./Header.scss";

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
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        className="auth-bottom-sheet"
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <Authorization />
        </div>
      </BottomSheet>

      {/* Book Now Sheet */}
      <BottomSheet
        open={openBookNow}
        onDismiss={() => dispatch(setOpenBookNow(false))}
        defaultSnap={({ snapPoints, lastSnap }) =>
          lastSnap ?? Math.min(...snapPoints)
        }
        className="auth-bottom-sheet"
      >
        <div className="sheetBody" style={{ marginTop: 0 }}>
          <BookNow />
        </div>
      </BottomSheet>
    </>
  );
};

export default Header;

import { NavLink, Outlet } from "react-router";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router";

const ServiceLayout = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    const activeTab = containerRef.current?.querySelector(".active");
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        inline: "center", 
        block: "nearest",
      });
    }
  }, [location.pathname]);

  return (
    <div className="blogPage px-0">
      <div className="fs-2 text-center my-4">Blog</div>
      <div className="blog-tab" ref={containerRef}>
        <div className="white-space">
          <NavLink
            className="btn btn-md base-btn outlined overflowHidden"
            to="/blog"
            end
          >
            All
          </NavLink>
          <NavLink
            className="btn btn-md base-btn outlined overflowHidden"
            to="/blog/dry-cleaning-and-laundry"
            end
          >
            Drycleaning & Laundry
          </NavLink>
          <NavLink
            className="btn btn-md base-btn outlined overflowHidden"
            to="/blog/shoes-and-bag-care"
            end
          >
            Shoes & BAG Care
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ServiceLayout;

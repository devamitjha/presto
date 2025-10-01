import { Outlet, useNavigate, useLocation, NavLink } from "react-router";
import { useEffect, useRef } from "react";
import BlogDropdown from "../components/BlogDropdown"; 

const Bloglayout = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Categories config (route + label)
  const categories = [
    { label: "All Blogs", path: "/blog" },
    { label: "Drycleaning & Laundry", path: "/blog/dry-cleaning-and-laundry" },
    { label: "Shoe & Bag Care", path: "/blog/shoes-and-bag-care" },
  ];

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

      {/* Dropdown filter */}
      <div className="blog-filter d-flex justify-content-center mb-3">
        <BlogDropdown
          categories={categories}
          currentPath={location.pathname}
          onSelect={(path) => navigate(path)}
        />
      </div>

      {/* Tab navigation (keep your old horizontal tabs for desktop if needed) */}
      {/* <div className="blog-tab" ref={containerRef}>
        <div className="white-space">
          {categories.map((cat) => (
            <NavLink
              key={cat.path}
              className="btn btn-md base-btn outlined overflowHidden"
              to={cat.path}
              end
            >
              {cat.label}
            </NavLink>
          ))}
        </div>
      </div> */}

      <Outlet />
    </div>
  );
};

export default Bloglayout;

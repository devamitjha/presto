import { NavLink, Outlet } from 'react-router';

const ServiceLayout = () => {
  return (
    <div className="blogPage px-0">
      <div className="fs-2 text-center my-4">Blog</div>
      <div className="blog-tab">
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
      <Outlet />
    </div>
  );
};

export default ServiceLayout;

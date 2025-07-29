import { Helmet } from "react-helmet";
import { NavLink, Outlet } from 'react-router';



const HelmetMeta = () => (
  <Helmet>
    <title>Blog | All Posts</title>
    <meta name="description" content="Learn more about our company and mission." />
    <meta name="keywords" content="about us, company, mission, values" />
    <link rel="canonical" href="https://www.yoursite.com" />
  </Helmet>
);



const ServiceLayout = () => {
  return (
    <div className="blogPage px-0">
      <HelmetMeta />
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

import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import { Helmet } from "react-helmet";

const Layout = () => {
  return (
    <div className="presstoApp">   
        <Helmet>
          {/* Google Tag Manager */}
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WCHKTB6F');
            `}
          </script>
        </Helmet>        
        <Header/>
        <Outlet />
        <Footer />
    </div>
  );
};

export default Layout;

import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';
import Footer from './components/Footer';
import EnvIndicator from './components/EnvIndicator';
import { Helmet } from "react-helmet";
import BottomNav from './components/BottomNav';
import RechargeSheet from './components/RechargeSheet';

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

          {/* Microsoft Clarity */}
          <script type="text/javascript">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "w8cppkm83m");
            `}
          </script>

        </Helmet>        
        <Header/>
        <Outlet />
        <Footer />
        <BottomNav />
        <RechargeSheet />
        <EnvIndicator />
    </div>
  );
};

export default Layout;

import React from 'react';
import "./SixColumnLayout.scss";
import Heading from './common/Heading';
import { ArrowUpRight, Download } from 'lucide-react';
import StaggerOnView from "../components/common/StaggerOnView";
import PresstoGeneralBrochure from "../assets/images/Pressto-General-Brochure.pdf";
import {useDispatch } from "react-redux";
import { setOpenBookNow } from "../redux/slices/sheetSlice";
import { Image } from '@imagekit/react';


const SixColumnlayout = () => {
   const dispatch = useDispatch();
    const goToBookNowPage = () => {
        dispatch(setOpenBookNow(true));
        //data layer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "rollout_banner_click",
          event_type:"book_now_popup_open"
        });
    };
    const downloadPDF = ()=>{
        //data layer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "download_brochure",
          event_type:"download_pdf"
        });
    }
  return ( 
    <section className="section-container six-columns rollOut mb-120">
          <Heading title="Roll Out with Freedom" />
          <StaggerOnView className="row">
              <div className="item">
                 <Image
                    urlEndpoint="https://www.presstoindia.com/media/rollout/"
                    src="six-col-1.jpg"
                    width={868}
                    height={868}
                    alt="roll out"
                  />
                  <div className="title-container">
                      <h4>Care Beyond Clean</h4>
                      <p>Schedule a free pickup & drop as per your convenience</p>
                      <div className="link" onClick={goToBookNowPage}>Schedule Now <span className="icon-box"><ArrowUpRight /></span></div>
                  </div>
              </div>
              <div className="item">
                 <Image
                    urlEndpoint="https://www.presstoindia.com/media/rollout/"
                    src="six-col-2.jpg"
                    width={868}
                    height={868}
                    alt="roll out with freedom"
                  />
                  <div className="title-container black">
                    <h4>Know all about us</h4>
                    <p>A complete guide about Pressto  and how we do it!</p>
                    <a href={PresstoGeneralBrochure} download className="link" onClick={downloadPDF}>
                        Download brochure <span className="icon-box"><Download /></span>
                    </a>
                  </div>
              </div>
          </StaggerOnView>
    </section>
  )
}

export default SixColumnlayout

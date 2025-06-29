import React from 'react';
import { Link } from 'react-router';
import "./SixColumnLayout.scss";
import Heading from './common/Heading';
import sixCol from "../assets/images/rollout/six-col-1.jpg";
import sixCol2 from "../assets/images/rollout/six-col-2.jpg";
import { ArrowUpRight, Download } from 'lucide-react';
import StaggerOnView from "../components/common/StaggerOnView"


const SixColumnlayout = () => {
  return (
    <section className="section-container six-columns">
          <Heading title="Roll Out with Freedom" />
          <StaggerOnView className="row">
              <div className="item">
                  <img src={sixCol} width="868px" heigh="868px" alt="roll out" />
                  <div className="title-container">
                      <h4>Care Beyond Clean</h4>
                      <p>Get a premium umbrella on bill 10K and above</p>
                      <Link to="/" className="link">Avail Now <span className="icon-box"><ArrowUpRight /></span></Link>
                  </div>
              </div>
              <div className="item">
                  <img src={sixCol2} width="868px" heigh="868px" alt="roll out with freedom" />
                  <div className="title-container black">
                      <h4>Know all about us</h4>
                      <p>A complete guide about Pressto  and how we do it!</p>
                      <Link to="/" className="link">Download brochure <span className="icon-box"><Download /></span></Link>
                  </div>
              </div>
          </StaggerOnView>
    </section>
  )
}

export default SixColumnlayout

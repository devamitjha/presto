import React from 'react';
import { Link } from 'react-router';
import "./SixColumnLayout.scss";
import Heading from './common/Heading';
import sixCol from "../assets/images/six-col-1.jpg";
import sixCol2 from "../assets/images/six-col-2.jpg";
import { ArrowUpRight } from 'lucide-react';
import StaggerOnView from "../components/common/StaggerOnView"


const SixColumnlayout = () => {
  return (
    <section className="section-container six-columns">
          <Heading title="Roll Out with Freedom" />
          <StaggerOnView className="row">
              <div className="item">
                  <img src={sixCol} width="868px" heigh="868px" alt="roll out" />
                  <div className="title-container">
                      <h4>Play holi your Way</h4>
                      <p>Celebrate Festivals with zero worries coz pressto got you covered all time</p>
                      <Link to="/" className="link">Book Now <span className="icon-box"><ArrowUpRight /></span></Link>
                  </div>
              </div>
              <div className="item">
                  <img src={sixCol2} width="868px" heigh="868px" alt="roll out with freedom" />
                  <div className="title-container black">
                      <h4>Pressto Pre paid Cards</h4>
                      <p>Say bye to frequent payments use Pressto cards and keep tab of all accounts in 1</p>
                      <Link to="/" className="link">Get Card <span className="icon-box"><ArrowUpRight /></span></Link>
                  </div>
              </div>
          </StaggerOnView>
    </section>
  )
}

export default SixColumnlayout

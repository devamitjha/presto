import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setService } from '../redux/slices/beforeAfterSlice';
import BeforeAfterSliderCarousel from '../components/BeforeAfterSliderCarousel';
import './SolutionFinder.scss';

// --- Images ---
import dryCleaning49 from "../assets/images/beforeAfter/dry-cleaning/desktop/49.png";
import dryCleaning50 from "../assets/images/beforeAfter/dry-cleaning/desktop/50.png";
import dryCleaning51 from "../assets/images/beforeAfter/dry-cleaning/desktop/51.png";
import dryCleaning52 from "../assets/images/beforeAfter/dry-cleaning/desktop/52.png";
import dryCleaning53 from "../assets/images/beforeAfter/dry-cleaning/desktop/53.png";
import dryCleaning54 from "../assets/images/beforeAfter/dry-cleaning/desktop/54.png";
import dryCleaning55 from "../assets/images/beforeAfter/dry-cleaning/desktop/55.png";
import dryCleaning56 from "../assets/images/beforeAfter/dry-cleaning/desktop/56.png";

import Cleaning1 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/1.jpg";
import Cleaning2 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/3.jpg";
import Cleaning3 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/7.jpg";
import Cleaning4 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/8.jpg";
import Cleaning5 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/10.jpg";
import Cleaning6 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/14.jpg";
import Cleaning7 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/17.jpg";
import Cleaning8 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/20.jpg";
import Cleaning9 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/21.jpg";
import Cleaning10 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/22.jpg";
import Cleaning11 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/26.jpg";
import Cleaning12 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/29.jpg";
import Cleaning13 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/30.jpg";
import Cleaning14 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/32.jpg";
import Cleaning15 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/36.jpg";
import Cleaning16 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/37.jpg";
import Cleaning17 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/40.jpg";
import Cleaning18 from "../assets/images/beforeAfter/shoes-bag-care/desktop/cleaning/47.jpg";

import Reparing1 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/9.jpg";
import Reparing2 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/12.jpg";
import Reparing3 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/15.jpg";
import Reparing4 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/16.jpg";
import Reparing5 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/18.jpg";
import Reparing6 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/19.jpg";
import Reparing7 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/27.jpg";
import Reparing8 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/28.jpg";
import Reparing9 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/31.jpg";
import Reparing10 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/33.jpg";
import Reparing11 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/34.jpg";
import Reparing12 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/35.jpg";
import Reparing13 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/38.jpg";
import Reparing14 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/39.jpg";
import Reparing15 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/43.jpg";
import Reparing16 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/45.jpg";
import Reparing17 from "../assets/images/beforeAfter/shoes-bag-care/desktop/reparing/46.jpg";

import Restoring1 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/2.jpg";
import Restoring2 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/4.jpg";
import Restoring3 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/5.jpg";
import Restoring4 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/6.jpg";
import Restoring5 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/11.jpg";
import Restoring6 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/13.jpg";
import Restoring7 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/23.jpg";
import Restoring8 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/24.jpg";
import Restoring9 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/25.jpg";
import Restoring10 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/41.jpg";
import Restoring11 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/42.jpg";
import Restoring12 from "../assets/images/beforeAfter/shoes-bag-care/desktop/restoring/44.jpg";

const SolutionFinder = ({ selected }) => {
  const dispatch = useDispatch();
  const selectedService = useSelector((state) => state.service.selectedService) || selected;
  const [material, setMaterial] = useState('');

  // Map materials to their images
  const materialImages = {
    drycleaning: [
      { image: dryCleaning49, title: "Dry Cleaning 49" },
      { image: dryCleaning50, title: "Dry Cleaning 50" },
      { image: dryCleaning51, title: "Dry Cleaning 51" },
      { image: dryCleaning52, title: "Dry Cleaning 52" },
      { image: dryCleaning53, title: "Dry Cleaning 53" },
      { image: dryCleaning54, title: "Dry Cleaning 54" },
      { image: dryCleaning55, title: "Dry Cleaning 55" },
      { image: dryCleaning56, title: "Dry Cleaning 56" },
    ],
    cleaning: [
      { image: Cleaning1, title: "Cleaning 1" },
      { image: Cleaning2, title: "Cleaning 2" },
      { image: Cleaning3, title: "Cleaning 3" },
      { image: Cleaning4, title: "Cleaning 4" },
      { image: Cleaning5, title: "Cleaning 5" },
      { image: Cleaning6, title: "Cleaning 6" },
      { image: Cleaning7, title: "Cleaning 7" },
      { image: Cleaning8, title: "Cleaning 8" },
      { image: Cleaning9, title: "Cleaning 9" },
      { image: Cleaning10, title: "Cleaning 10" },
      { image: Cleaning11, title: "Cleaning 11" },
      { image: Cleaning12, title: "Cleaning 12" },
      { image: Cleaning13, title: "Cleaning 13" },
      { image: Cleaning14, title: "Cleaning 14" },
      { image: Cleaning15, title: "Cleaning 15" },
      { image: Cleaning16, title: "Cleaning 16" },
      { image: Cleaning17, title: "Cleaning 17" },
      { image: Cleaning18, title: "Cleaning 18" },
    ],
    repairing: [
      { image: Reparing1, title: "Reparing1 1" },
      { image: Reparing2, title: "Reparing1 2" },
      { image: Reparing3, title: "Reparing1 3" },
      { image: Reparing4, title: "Reparing1 4" },
      { image: Reparing5, title: "Reparing1 5" },
      { image: Reparing6, title: "Reparing1 6" },
      { image: Reparing7, title: "Reparing1 7" },
      { image: Reparing8, title: "Reparing1 8" },
      { image: Reparing9, title: "Reparing1 9" },
      { image: Reparing10, title: "Reparing1 10" },
      { image: Reparing11, title: "Reparing1 11" },
      { image: Reparing12, title: "Reparing1 12" },
      { image: Reparing13, title: "Reparing1 13" },
      { image: Reparing14, title: "Reparing1 14" },
      { image: Reparing15, title: "Reparing1 15" },
      { image: Reparing16, title: "Reparing1 16" },
      { image: Reparing17, title: "Reparing1 17" },
    ],   
    restoring: [
      { image: Restoring1, title: "Restoration 1" },
      { image: Restoring2, title: "Restoration 2" },
      { image: Restoring3, title: "Restoration 3" },
      { image: Restoring4, title: "Restoration 4" },
      { image: Restoring5, title: "Restoration 5" },
      { image: Restoring6, title: "Restoration 6" },
      { image: Restoring7, title: "Restoration 7" },
      { image: Restoring8, title: "Restoration 8" },
      { image: Restoring9, title: "Restoration 9" },
      { image: Restoring10, title: "Restoration 10" },
      { image: Restoring11, title: "Restoration 11" },
      { image: Restoring12, title: "Restoration 12" },
    ],
  };

  const setCurrentService = (e) => {
    dispatch(setService(e.target.value));
  };

  // Keep Redux in sync with `selected` prop
  useEffect(() => {
    if (selected) {
      dispatch(setService(selected));
    }
  }, [selected, dispatch]);

  // Reset material whenever service or selected changes
  useEffect(() => {
    setMaterial('');
  }, [selectedService, selected]);

  const renderMaterialComponent = () => {
    if (material && materialImages[material]) {
      return <BeforeAfterSliderCarousel imageData={materialImages[material]} />;
    }
    return null;
  };

  return (
    <div className="solution-finder">
      <div className="dropdowns">
        {/* Service dropdown */}
        <div className="dropdown">
          <label htmlFor="service">Select Service</label>
          <select id="service" value={selectedService} onChange={setCurrentService}>
            <option value="">Select</option>
            <option value="dry-cleaning">Dry Cleaning</option>
            <option value="restoration">Shoes &amp; Bag Restoration</option>
          </select>
        </div>

        {/* Material dropdown - conditional */}
        {selectedService === 'dry-cleaning' && (
          <div className="dropdown">
            <label htmlFor="material">Select Material</label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">Select</option>
              <option value="drycleaning">Dry Cleaning</option>
            </select>
          </div>
        )}

        {selectedService === 'restoration' && (
          <div className="dropdown">
            <label htmlFor="material">Select Material</label>
            <select
              id="material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">Select</option>
              <option value="repairing">Repairing</option>
              <option value="cleaning">Cleaning</option>
              <option value="restoring">Restoring</option>
            </select>
          </div>
        )}
      </div>

      {/* Default view when no material is selected */}
      {selectedService === 'dry-cleaning' && material === '' && (
        <BeforeAfterSliderCarousel imageData={materialImages.drycleaning} />
      )}
      {selectedService === 'restoration' && material === '' && (
        <BeforeAfterSliderCarousel imageData={materialImages.restoring} />
      )}

      {/* Selected material view */}
      {renderMaterialComponent()}
    </div>
  );
};

export default SolutionFinder;

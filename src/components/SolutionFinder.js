import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setService } from '../redux/slices/beforeAfterSlice';
import BeforeAfterSliderCarousel from '../components/BeforeAfterSliderCarousel';
import './SolutionFinder.scss';

// --- Images ---
import Cleaning1 from "../assets/images/beforeAfter/cleaning/1.jpg";
import Cleaning2 from "../assets/images/beforeAfter/cleaning/2.jpg";
import Cleaning4 from "../assets/images/beforeAfter/cleaning/4.jpg";
import Cleaning5 from "../assets/images/beforeAfter/cleaning/5.jpg";
import Cleaning7 from "../assets/images/beforeAfter/cleaning/7.jpg";
import Cleaning8 from "../assets/images/beforeAfter/cleaning/8.jpg";
import Restoration1 from "../assets/images/beforeAfter/restoring/1.jpg";
import Restoration2 from "../assets/images/beforeAfter/restoring/2.jpg";

const SolutionFinder = ({ selected }) => {
  const dispatch = useDispatch();
  const selectedService = useSelector((state) => state.service.selectedService) || selected;
  const [material, setMaterial] = useState('');

  // Map materials to their images
  const materialImages = {
    drycleaning: [
      { image: Restoration1, title: "Cleaning 1" },
      { image: Restoration2, title: "Cleaning 2" },
    ],
    repairing: [
      { image: Cleaning1, title: "Restoration 1" },
      { image: Cleaning2, title: "Restoration 2" },
    ],
    cleaning: [
      { image: Cleaning4, title: "Cleaning 1" },
      { image: Cleaning5, title: "Cleaning 2" },
    ],
    restoring: [
      { image: Cleaning7, title: "Restoration 1" },
      { image: Cleaning8, title: "Restoration 2" },
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

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setService } from '../redux/slices/beforeAfterSlice';
import BeforeAfterSliderCarousel from '../components/BeforeAfterSliderCarousel';
import './SolutionFinder.scss';

// --- Images ---

const SolutionFinder = ({ selected }) => {
  const dispatch = useDispatch();
  const selectedService = useSelector((state) => state.service.selectedService) || selected;
  const [material, setMaterial] = useState('');

  // Map materials to their images
  const materialImages = {
    drycleaning: [
      { image: "beforeAfter/dry-cleaning/desktop/49.png", title: "Dry Cleaning 49" },
      { image: "beforeAfter/dry-cleaning/desktop/50.png", title: "Dry Cleaning 50" },
      { image: "beforeAfter/dry-cleaning/desktop/51.png", title: "Dry Cleaning 51" },
      { image: "beforeAfter/dry-cleaning/desktop/52.png", title: "Dry Cleaning 52" },
      { image: "beforeAfter/dry-cleaning/desktop/53.png", title: "Dry Cleaning 53" },
      { image: "beforeAfter/dry-cleaning/desktop/54.png", title: "Dry Cleaning 54" },
      { image: "beforeAfter/dry-cleaning/desktop/55.png", title: "Dry Cleaning 55" },
      { image: "beforeAfter/dry-cleaning/desktop/56.png", title: "Dry Cleaning 56" },
    ],
    cleaning: [
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/1.jpg", title: "Cleaning 1" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/3.jpg", title: "Cleaning 2" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/7.jpg", title: "Cleaning 3" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/8.jpg", title: "Cleaning 4" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/10.jpg", title: "Cleaning 5" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/14.jpg", title: "Cleaning 6" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/17.jpg", title: "Cleaning 7" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/20.jpg", title: "Cleaning 8" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/21.jpg", title: "Cleaning 9" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/22.jpg", title: "Cleaning 10" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/26.jpg", title: "Cleaning 11" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/29.jpg", title: "Cleaning 12" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/30.jpg", title: "Cleaning 13" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/32.jpg", title: "Cleaning 14" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/36.jpg", title: "Cleaning 15" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/37.jpg", title: "Cleaning 16" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/40.jpg", title: "Cleaning 17" },
      { image: "beforeAfter/shoes-bag-care/desktop/cleaning/47.jpg", title: "Cleaning 18" },
    ],
    repairing: [
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/9.jpg", title: "Reparing1 1" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/12.jpg", title: "Reparing1 2" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/15.jpg", title: "Reparing1 3" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/16.jpg", title: "Reparing1 4" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/18.jpg", title: "Reparing1 5" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/19.jpg", title: "Reparing1 6" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/27.jpg", title: "Reparing1 7" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/28.jpg", title: "Reparing1 8" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/31.jpg", title: "Reparing1 9" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/33.jpg", title: "Reparing1 10" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/34.jpg", title: "Reparing1 11" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/35.jpg", title: "Reparing1 12" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/38.jpg", title: "Reparing1 13" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/39.jpg", title: "Reparing1 14" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/43.jpg", title: "Reparing1 15" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/45.jpg", title: "Reparing1 16" },
      { image: "beforeAfter/shoes-bag-care/desktop/reparing/46.jpg", title: "Reparing1 17" },
    ],   
    restoring: [
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/2.jpg", title: "Restoration 1" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/4.jpg", title: "Restoration 2" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/5.jpg", title: "Restoration 3" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/6.jpg", title: "Restoration 4" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/11.jpg", title: "Restoration 5" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/13.jpg", title: "Restoration 6" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/23.jpg", title: "Restoration 7" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/24.jpg", title: "Restoration 8" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/25.jpg", title: "Restoration 9" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/41.jpg", title: "Restoration 10" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/42.jpg", title: "Restoration 11" },
      { image: "beforeAfter/shoes-bag-care/desktop/restoring/44.jpg", title: "Restoration 12" },
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

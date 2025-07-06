import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setService } from '../redux/slices//beforeAfterSlice';
import './SolutionFinder.scss';

const SolutionFinder = ({ selected }) => {
  const dispatch = useDispatch();
  const selectedService = useSelector((state) => state.service.selectedService) || selected;
  const [material, setMaterial] = useState('');

  const setCurrentService = (e) => {
    dispatch(setService(e.target.value));
  };
  

  return (
    <div className="solution-finder">
      <div className="dropdowns">
        <div className="dropdown">
          <label htmlFor="service">Select Service</label>
          <select
            id="service"
            value={selectedService}
            onChange={setCurrentService}
          >
            <option value="">Select</option>
            <option value="dry-cleaning">Dry Cleaning</option>
            <option value="restoration">Shoes & Bag Restoration</option>
          </select>
        </div>

        <div className="dropdown">
          <label htmlFor="material">Select Material</label>
          <select
            id="material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="">Select</option>
            <option value="silk">Silk</option>
            <option value="leather">Leather</option>
            <option value="cotton">Cotton</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SolutionFinder;

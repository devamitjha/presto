import React, { useState } from 'react';
import './SolutionFinder.scss';

const SolutionFinder = () => {
  const [service, setService] = useState('');
  const [material, setMaterial] = useState('');

  return (
    <div className="solution-finder">
      <div className="dropdowns">
        <div className="dropdown">
          <label htmlFor="service">Select Service</label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
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

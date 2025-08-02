import React from 'react';

const services = ['Garment Cleaning', 'Shoe Laundry', 'Bags Cleaning', 'Pressing'];

const Review = ({ formData, setFormData, prevStep, handleSubmit }) => {
  const handleCountChange = (service, type) => {
    setFormData(prev => ({
      ...prev,
      serviceCounts: {
        ...prev.serviceCounts,
        [service]: Math.max(0, (prev.serviceCounts?.[service] || 0) + (type === 'inc' ? 1 : -1))
      }
    }));
  };

  const handleInstructionsChange = e => {
    setFormData(prev => ({ ...prev, instructions: e.target.value }));
  };

  return (
    <div className="form-step">
      {services.map(service => (
        <div className="service-row" key={service}>
          <span>{service}</span>
          <div className="qty-box">
            <button onClick={() => handleCountChange(service, 'dec')}>−</button>
            <span>{formData.serviceCounts?.[service] || '00'}</span>
            <button onClick={() => handleCountChange(service, 'inc')}>+</button>
          </div>
        </div>
      ))}

     

      <div className="input-group floating-label with-button">
        <div className="input-wrapper instructions">
            <textarea
              placeholder="Add Instructions"
              value={formData.instructions || ''}
              onChange={handleInstructionsChange}
              id="instructions"
              className={formData.instructions ? 'filled' : ''}
            />
          <label htmlFor="instructions">Add Insutructions</label>
        </div>
      </div>

      <div className="buttons">
        {/* <button className="prev-btn" onClick={prevStep}>Back</button> */}
        <button className="next-btn submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Review;

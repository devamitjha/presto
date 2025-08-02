import React from "react";
import "./AwardsSection.scss";

const awards = [
  {
    title: "Best in Class Dry CLeaning",
    description:
      "Best in Class Dry Cleaning for Luxury and Branded Clothes. You know who has been the face of the town.",
  },
  {
    title: "Best in Class Dry CLeaning",
    description:
      "Best in Class Dry Cleaning for Luxury and Branded Clothes. You know who has been the face of the town.",
  },
  {
    title: "Best in Class Dry CLeaning",
    description:
      "Best in Class Dry Cleaning for Luxury and Branded Clothes. You know who has been the face of the town.",
  },
];

const images = [
  "/images/award-1.png",
  "/images/award-2.png",
  "/images/award-3.png",
  "/images/award-4.png",
];

const AwardsSection = () => {
  return (
    <section className="awards-section width-fluid mt-30 mb-30">
      <h2 className="heading-2 text-center mb-25">Awards & Mentions</h2>
      <div className="awards-section__content">
        <div className="awards-section__cards">
          {awards.map((item, index) => (
            <div key={index} className="award-card sm-radius">
              <div className="award-card__image" />
              <h3 className="heading-6">{item.title}</h3>
              <p className="body-3">{item.description}</p>
            </div>
          ))}
        </div>
        <div className="awards-section__sidebar">
          <p className="body-2 mb-20">
            At Pressto, every Presstodian brings our motto – Look Good, Feel
            Better; to life with heartfelt care, sharp skill, and an eye for
            detail. It’s not just what we do, it’s how we do it, with quiet
            precision and pride in every fold
          </p>
          <div className="awards-section__gallery mb-20">
            {images.map((src, idx) => (
              <img src={src} alt={`Gallery ${idx + 1}`} key={idx} />
            ))}
          </div>
          <button className="base-btn btn-md outlined">View Gallery</button>
        </div>
      </div>
      <div className="d-flex mt-25">
        <button className="base-btn btn-md primary">View All</button>
      </div>
    </section>
  );
};

export default AwardsSection;

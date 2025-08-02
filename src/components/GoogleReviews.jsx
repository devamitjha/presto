import React from 'react';
import { Link } from 'react-router';
import './GoogleReviews.scss';
import Google from "../assets/images/google.jpg";

const reviews = [
  {
    name: 'Jeminah Rodriguss',
    date: '26th June 2023',
    image: 'https://i.pravatar.cc/40?img=1',
  },
  {
    name: 'Shreeyna P',
    date: '22th June 2023',
    image: 'https://i.pravatar.cc/40?img=2',
  },
  {
    name: 'Shreeyna P',
    date: '22th June 2023',
    image: 'https://i.pravatar.cc/40?img=2',
  },
  {
    name: 'Jeminah Rodriguss',
    date: '26th June 2023',
    image: 'https://i.pravatar.cc/40?img=1',
  },
  {
    name: 'Jeminah Rodriguss',
    date: '26th June 2023',
    image: 'https://i.pravatar.cc/40?img=1',
  },
];

const GoogleReviews = () => {
  return (
    <div className="google-reviews">
      <div className="review-header">
        <span className="google-logo">
            <img src={Google} alt="google review" width="142px" height="48px"/>
        </span>
        <span className="title">Reviews</span>
      </div>
      <div className="reviews">
        {reviews.map((review, index) => (
          <div className="review" key={index}>
            <div className="left">
              <img src={review.image} alt={review.name} className="avatar" />
              <div>
                <div className="name">{review.name}</div>
                <div className="stars">★★★★★</div>
              </div>
            </div>
            <div className="date">{review.date}</div>
          </div>
        ))}
      </div>
      <div className="review-footer">
        <Link to="/" className="leave-note">Experienced Presto? Leave us a Note Here &gt;</Link>
        <button className="write-review">WRITE REVIEW</button>
      </div>
    </div>
  );
};

export default GoogleReviews;

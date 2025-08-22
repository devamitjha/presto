import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import './GoogleReviews.scss';
import Google from "../assets/images/google.jpg";

const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex">
      {Array.from({ length: maxRating }).map((_, idx) => (
        <span key={idx}>
          {idx < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

const GoogleReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("https://www.presstoindia.com/get-synup-reviews.php");

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to fetch");
        }
        const data = await res.json();
        setReviews(data?.data.rollupInteractions?.edges || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);
  
  if (error) return <p>Error: {error}</p>;
  const filteredReviews = reviews.filter(
    (review) => review?.node?.rating > 3
  );

  console.log(reviews);
  return (
    <div className="google-reviews">
      <div className="review-header">
        <span className="google-logo">
            <img src={Google} alt="google review" width="142px" height="48px"/>
        </span>
        <span className="title">Reviews</span>
      </div>
      <div className="reviews">
        {loading ? (
              Array.from({ length: 7 }).map((_, index) =>  (                
                <div className="review skelton-ui" key={index}>
                  <div className="ph-item left-side">
                    <div className="leftitem">
                      <div className="ph-col-2 avtar-section">
                          <div className="ph-avatar"></div>
                      </div>
                      <div className="empty-box">
                          <div className="ph-row">
                              <div className="ph-col-4"></div>
                              <div className="ph-col-8 empty"></div>
                              <div className="ph-col-2"></div>
                              <div className="ph-col-10 empty"></div>
                          </div>
                      </div>
                    </div>
                      <div className="date">
                            <div className="ph-row">
                              <div className="ph-col-12"></div>
                            </div>
                      </div>
                  </div>
                  
                </div>
              ))
          ) : (
            filteredReviews.slice(0, 7).map((review) => (
              <div className="review" key={review.node.id}>
                <Link className="left" to={review.node.permalink} target="_blank" rel="noopener noreferrer">
                  <img src={review.node.authorAvatar} alt={review.node.authorName} className="avatar" />
                  <div>
                    <div className="name">{review.node.authorName}</div>                    
                    <div className="stars"><StarRating rating={review.node.rating} /></div>
                  </div>
                </Link>
                <div className="date">{new Date(review.node.date).toLocaleDateString()}</div>
              </div>
            ))
        )}
      
        </div>
      
      {/* <div className="review-footer">
        <Link to="/" className="leave-note">Experienced Presto? Leave us a Note Here &gt;</Link>
        <button className="write-review">WRITE REVIEW</button>
      </div> */}
    </div>
  );
};

export default GoogleReviews;

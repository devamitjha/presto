import React, { useEffect, useState } from 'react';

const Reviews = () => {
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

        // ✅ Extract edges safely
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

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(reviews);

  return (
    <div>
      <h3>Synup Reviews</h3>
      {error ? (
        <p>Error: {error}</p>
      ) : reviews.length === 0 ? (
        <p>Loading or no reviews...</p>
      ) : (
        <ul>
          {reviews.map((review, idx) => (
            <li key={idx}>
              <p><strong>{review.node.authorName}</strong> ({review.node.rating}★)</p>
              <p>{review.comment}</p>
              <small>{new Date(review.node.date).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;

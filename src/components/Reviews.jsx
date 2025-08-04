import React, { useEffect, useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("https://www.presstoindia.com/get-synup-reviews.php", {
          method: "GET",
          credentials: "include", // Optional — use only if needed
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch");

        setReviews(data.reviews || []);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err.message);
      }
    };

    fetchReviews();
  }, []);

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
              <p><strong>{review.author_name}</strong> ({review.rating}★)</p>
              <p>{review.comment}</p>
              <small>{new Date(review.created_at).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Reviews;

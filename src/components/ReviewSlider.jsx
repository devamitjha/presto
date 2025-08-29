import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { ChevronRight, ChevronLeft, Star } from 'lucide-react';
import { Link } from 'react-router';
import './ReviewSlider.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NavNextArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navNext"
      onClick={onClick}
    > <ChevronRight /></div>
  );
}

function NavPrevArrow(props) {
  const {onClick } = props;
  return (
    <div
      className="navPrev"
      onClick={onClick}
    ><ChevronLeft /></div>
  );
}

const StarRating = ({ rating, maxRating = 5 }) => {
  return (
    <div className="flex">
      {Array.from({ length: maxRating }).map((_, idx) => (
        <span key={idx}>
            <Star size={14} fill="#FFC107" color="#FFC107" />          
        </span>
      ))}
    </div>
  );
};




const ReviewSlider = () => {  
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

  const settings = {
    dots: false,
    infinite: true,
    speed: 700,
    autoplay: false,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover: true,
    nextArrow: <NavNextArrow />,
    prevArrow: <NavPrevArrow />
  };

  return (
    <div className="reviewslider">
          {loading ? (<p className="text-center">Loading Review...</p>) :(
                <Slider {...settings}>          
                        {reviews.map((review) => (
                            <div className="slider-card" key={review.node.id}>
                                <Link className="review-card" to={review.node.permalink} target="_blank" rel="noopener noreferrer">
                                    <div className="user-info">
                                    <img
                                        src={review.node.authorAvatar}
                                        alt={review.node.authorName}
                                        className="avatar"
                                    />
                                    <div>
                                        <p className="name">{review.node.authorName}</p>
                                        <div className="stars">
                                            <StarRating rating={review.node.rating} />
                                        </div>
                                    </div>
                                    </div>
                                    <p className="date">{new Date(review.node.date).toLocaleDateString()}</p>
                                </Link>
                            </div>
                        ))}
                </Slider>
            )}
    </div>
  );
};

export default ReviewSlider;



       


        
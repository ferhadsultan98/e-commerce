import React, { useState } from 'react';
import '../../';

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([
    { id: 1, customerName: 'John Doe', rating: 5, comment: 'Amazing product, highly recommend!' },
    { id: 2, customerName: 'Jane Smith', rating: 4, comment: 'Great quality, but shipping took a bit.' },
  ]);
  const [newReview, setNewReview] = useState({ customerName: '', rating: 0, comment: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.customerName || !newReview.comment || newReview.rating === 0) {
      alert('Please fill out all fields.');
      return;
    }
    setReviews((prev) => [
      ...prev,
      { id: prev.length + 1, ...newReview },
    ]);
    setNewReview({ customerName: '', rating: 0, comment: '' });
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <span
          key={index}
          className={`star ${index < rating ? 'filled' : ''}`}
          onClick={() => handleRatingChange(index + 1)}
        >
          ★
        </span>
      ));
  };

  return (
    <div className="customerReviewsContainer">
      <h2 className="sectionTitle">Customer Reviews</h2>
      <div className="reviewsList">
        {reviews.length === 0 ? (
          <p className="noReviews">No reviews yet. Be the first to share your thoughts!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="reviewCard">
              <h3 className="customerName">{review.customerName}</h3>
              <div className="rating">{renderStars(review.rating)}</div>
              <p className="comment">{review.comment}</p>
            </div>
          ))
        )}
      </div>
      <form className="reviewForm" onSubmit={handleSubmit}>
        <h3 className="formTitle">Write a Review</h3>
        <div className="formGroup">
          <label htmlFor="customerName">Your Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={newReview.customerName}
            onChange={handleInputChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="formGroup">
          <label>Rating</label>
          <div className="ratingInput">{renderStars(newReview.rating)}</div>
        </div>
        <div className="formGroup">
          <label htmlFor="comment">Your Review</label>
          <textarea
            id="comment"
            name="comment"
            value={newReview.comment}
            onChange={handleInputChange}
            placeholder="Share your thoughts..."
          />
        </div>
        <button type="submit" className="submitButton">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default CustomerReviews;
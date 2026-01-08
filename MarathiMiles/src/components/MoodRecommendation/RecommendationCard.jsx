// src/components/MoodRecommendation/RecommendationCard.jsx
import React from 'react';
import './RecommendationCard.css';

const RecommendationCard = ({ place, matchDetails, onClick }) => {
  return (
    <div className="recommendation-card" onClick={onClick}>
      {/* Match Badge */}
      <div className="match-badge">
        {matchDetails?.matchPercentage}% Match
      </div>
      
      {/* Match Reasons */}
      <div className="match-reasons">
        {matchDetails?.matchReasons?.map((reason, index) => (
          <span key={index} className="match-reason">✅ {reason}</span>
        ))}
      </div>
      
      {/* Place Image */}
      <img 
        src={place.image} 
        alt={place.name}
        className="place-image"
      />
      
      {/* Place Info */}
      <div className="place-info">
        <h3 className="place-name">{place.name}</h3>
        <p className="place-location">{place.location}</p>
        <p className="place-description">{place.description}</p>
        
        {/* Place Details */}
        <div className="place-details">
          <span className="detail-item">
            <i className="fas fa-wallet"></i>
            {place.budget}
          </span>
          <span className="detail-item">
            <i className="fas fa-clock"></i>
            {place.duration}
          </span>
        </div>
        
        {/* Interests */}
        <div className="interests">
          {place.interests?.slice(0, 3).map((interest, index) => (
            <span key={index} className="interest-tag">{interest}</span>
          ))}
        </div>
        
        {/* Highlights */}
        <div className="highlights">
          <strong>Highlights:</strong> {place.highlights?.slice(0, 2).join(' • ')}
        </div>
      </div>
      
      {/* View Details Button */}
      <button className="view-details-btn">
        View Detailed Plan <i className="fas fa-arrow-right"></i>
      </button>
    </div>
  );
};

export default RecommendationCard;
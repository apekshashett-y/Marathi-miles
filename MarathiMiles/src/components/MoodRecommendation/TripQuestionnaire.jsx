// components/MoodRecommendation/TripQuestionnaire.jsx
import React, { useState } from 'react';
import './TripQuestionnaire.css';

const TripQuestionnaire = ({ onQuestionnaireSubmit, detectedMood, isLoading, onBack, apiError, onRetry }) => {
  const [formData, setFormData] = useState({
    ageGroup: '',
    travelGroup: '',
    tripType: '',
    duration: '',
    budget: '',
    interests: []
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      const userProfile = {
        mood: detectedMood,
        ageGroup: formData.ageGroup,
        travelGroup: formData.travelGroup,
        tripType: formData.tripType,
        duration: formData.duration,
        budget: formData.budget,
        interests: formData.interests
      };
      console.log('📤 Passing user profile to parent:', userProfile);
      onQuestionnaireSubmit({ userProfile });
    }
  };

  const isFormValid = () => {
    return formData.ageGroup && 
           formData.travelGroup && 
           formData.tripType && 
           formData.duration && 
           formData.budget && 
           formData.interests.length > 0;
  };

  // Options data
  const ageGroups = [
    { value: '<18', label: 'Under 18', icon: '👦' },
    { value: '18-30', label: '18-30', icon: '👨' },
    { value: '30-50', label: '30-50', icon: '👨‍💼' },
    { value: '50+', label: '50+', icon: '👴' }
  ];

  const travelGroups = [
    { value: 'Solo', label: 'Solo', icon: '🚶', description: 'Traveling alone' },
    { value: 'Friends', label: 'Friends', icon: '👥', description: 'With friends' },
    { value: 'Family', label: 'Family', icon: '👨‍👩‍👧‍👦', description: 'Family trip' },
    { value: 'Couple', label: 'Couple', icon: '💑', description: 'Romantic getaway' }
  ];

  const tripTypes = [
    { value: 'Adventure', label: 'Adventure', icon: '🏔️', description: 'Thrilling activities & exploration' },
    { value: 'Relaxing', label: 'Relaxing', icon: '🏖️', description: 'Peaceful & stress-free getaway' },
    { value: 'Heritage', label: 'Heritage', icon: '🏛️', description: 'Historical & cultural sites' },
    { value: 'Nature', label: 'Nature', icon: '🌲', description: 'Natural landscapes & wildlife' },
    { value: 'Spiritual', label: 'Spiritual', icon: '🕉️', description: 'Religious & spiritual destinations' },
    { value: 'Luxury', label: 'Luxury', icon: '🌟', description: 'Premium experiences & comfort' },
    { value: 'Road Trip', label: 'Road Trip', icon: '🚗', description: 'Scenic drives & stops' },
    { value: 'Backpacking', label: 'Backpacking', icon: '🎒', description: 'Budget-friendly exploration' }
  ];

  const durations = [
    { value: '1 Day', label: 'Day Trip', icon: '☀️' },
    { value: '2-3 Days', label: 'Weekend', icon: '📅' },
    { value: '1 Week', label: '1 Week (7 Days)', icon: '🗓️' },
    { value: '2 Weeks', label: '2 Weeks (14 Days)', icon: '✈️' }
  ];

  const budgets = [
    { value: 'Low', label: 'Budget', icon: '💰', range: '₹5,000' },
    { value: 'Medium', label: 'Moderate', icon: '💵', range: '₹5,000 - ₹15,000' },
    { value: 'High', label: 'Luxury', icon: '💎', range: '₹15,000+' }
  ];

  const interests = [
    { value: 'Beaches', label: 'Beaches', icon: '🏖️' },
    { value: 'Forts', label: 'Forts', icon: '🏰' },
    { value: 'Food', label: 'Local Food', icon: '🍜' },
    { value: 'Waterfalls', label: 'Waterfalls', icon: '🌊' },
    { value: 'Wildlife', label: 'Wildlife', icon: '🐘' },
    { value: 'Trekking', label: 'Trekking', icon: '🥾' },
    { value: 'Photography', label: 'Photography', icon: '📸' },
    { value: 'Shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'Yoga', label: 'Yoga', icon: '🧘' },
    { value: 'Museums', label: 'Museums', icon: '🏛️' },
    { value: 'Festivals', label: 'Festivals', icon: '🎉' },
    { value: 'Nightlife', label: 'Nightlife', icon: '🌃' }
  ];

  return (
    <div className="questionnaire-container">
      {/* Header */}
      <div className="questionnaire-header">
        <button className="back-btn" onClick={onBack}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
        <div className="header-content">
          <h1>Plan Your Perfect Trip</h1>
          <p className="mood-indicator">
            <span className="mood">Detected Mood:</span> <span className={`mood-badge mood-${detectedMood?.toLowerCase()}`}>{detectedMood}</span>
          </p>
        </div>
      </div>

      {/* API Error banner with retry */}
      {apiError && (
        <div className="api-error-banner">
          <i className="fas fa-exclamation-triangle"></i>
          <span>{apiError}</span>
          {onRetry && (
            <button className="retry-btn" onClick={onRetry} disabled={isLoading}>
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-redo"></i>}
              Retry
            </button>
          )}
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <div className="form-container">
          {/* Age Group */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">👤</span>
              <h3>Your Age Group</h3>
            </div>
            <div className="options-grid compact">
              {ageGroups.map(age => (
                <button
                  key={age.value}
                  className={`option-card ${formData.ageGroup === age.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('ageGroup', age.value)}
                >
                  <div className="option-icon">{age.icon}</div>
                  <div className="option-label">{age.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Travel Companions */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">👥</span>
              <h3>Travel Companions</h3>
            </div>
            <div className="options-grid compact">
              {travelGroups.map(group => (
                <button
                  key={group.value}
                  className={`option-card ${formData.travelGroup === group.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('travelGroup', group.value)}
                >
                  <div className="option-icon">{group.icon}</div>
                  <div className="option-label">{group.label}</div>
                  <div className="option-description">{group.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trip Type */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">🎯</span>
              <h3>Trip Type</h3>
            </div>
            <div className="options-grid">
              {tripTypes.map(type => (
                <button
                  key={type.value}
                  className={`option-card ${formData.tripType === type.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('tripType', type.value)}
                >
                  <div className="option-icon">{type.icon}</div>
                  <div className="option-label">{type.label}</div>
                  <div className="option-description">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Trip Duration */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">⏱️</span>
              <h3>Trip Duration</h3>
            </div>
            <div className="options-grid compact">
              {durations.map(duration => (
                <button
                  key={duration.value}
                  className={`option-card ${formData.duration === duration.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('duration', duration.value)}
                >
                  <div className="option-icon">{duration.icon}</div>
                  <div className="option-label">{duration.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">💰</span>
              <h3>Budget Range</h3>
            </div>
            <div className="options-grid compact">
              {budgets.map(budget => (
                <button
                  key={budget.value}
                  className={`option-card ${formData.budget === budget.value ? 'selected' : ''}`}
                  onClick={() => handleInputChange('budget', budget.value)}
                >
                  <div className="option-icon">{budget.icon}</div>
                  <div className="option-label">{budget.label}</div>
                  <div className="option-range">{budget.range}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="form-section">
            <div className="section-header">
              <span className="section-icon">🌟</span>
              <h3>Your Interests (Select Multiple)</h3>
            </div>
            <div className="interests-grid">
              {interests.map(interest => (
                <button
                  key={interest.value}
                  className={`interest-card ${formData.interests.includes(interest.value) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest.value)}
                >
                  <div className="interest-icon">{interest.icon}</div>
                  <div className="interest-label">{interest.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="navigation-section">
          <button 
            className={`submit-btn ${!isFormValid() ? 'disabled' : ''}`}
            onClick={handleSubmit}
            disabled={!isFormValid() || isLoading}
          >
            {isLoading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Creating Your Trip Plan...
              </>
            ) : (
              <>
                <i className="fas fa-magic"></i>
                Generate My Smart Trip Plan
              </>
            )}
          </button>

          {/* Quick Stats */}
          <div className="quick-stats">
            <div className="stat-item">
              <div className="stat-number">
                {Object.values(formData).filter(val => val !== '' && !Array.isArray(val)).length}/5
              </div>
              <div className="stat-label">Questions Answered</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{formData.interests.length}</div>
              <div className="stat-label">Interests Selected</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {isFormValid() ? '✅' : '❌'}
              </div>
              <div className="stat-label">Ready to Submit</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripQuestionnaire;
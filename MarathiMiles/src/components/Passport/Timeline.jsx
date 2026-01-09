import React, { useState, useRef, useEffect } from "react";
import {
  maharashtraHistoricalEvents,
  getTimelineYears,
  searchEvents,
  getEraByYear,
} from "../../services/historicalData.js";
import "./Timeline.css";

const Timeline = () => {
  const [selectedYear, setSelectedYear] = useState(1630);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [yearNotFound, setYearNotFound] = useState(false);
  const timelineRef = useRef(null);
  const eventsSectionRef = useRef(null);
  const years = getTimelineYears();
  const currentEra = getEraByYear(selectedYear);

  // Get events for selected year
  const yearEvents =
    maharashtraHistoricalEvents.find((event) => event.year === selectedYear)
      ?.events || [];

  // Smooth scroll to events section
  const scrollToEventsSection = () => {
    if (eventsSectionRef.current) {
      eventsSectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedEvent(null);
    setIsSearching(false);
    setSearchQuery("");
    setYearNotFound(false);
    
    // Scroll to events section after a short delay
    setTimeout(() => {
      scrollToEventsSection();
    }, 100);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseEvent = () => {
    setSelectedEvent(null);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setYearNotFound(false);

    if (query.trim() === "") {
      setIsSearching(false);
      setSearchResults([]);
    } else {
      setIsSearching(true);
      
      // Check if it's a year search (numbers only)
      const isYearSearch = /^\d+$/.test(query.trim());
      
      if (isYearSearch) {
        const year = parseInt(query.trim());
        const yearExists = years.includes(year);
        
        if (yearExists) {
          // Show year in results
          const eventsForYear = maharashtraHistoricalEvents.find(e => e.year === year)?.events || [];
          setSearchResults([
            {
              year,
              id: 'year-search',
              title: `View all events for ${year}`,
              shortDescription: `${eventsForYear.length} historical events found`,
              category: 'Year Search',
              location: 'Maharashtra'
            }
          ]);
        } else {
          // Year not found
          setYearNotFound(true);
          setSearchResults([]);
        }
      } else {
        // Regular keyword search
        const results = searchEvents(query);
        setSearchResults(results);
      }
    }
  };

  const handleSearchResultClick = (result) => {
    setSelectedYear(result.year);
    const events =
      maharashtraHistoricalEvents.find((event) => event.year === result.year)
        ?.events || [];
    
    if (result.id !== 'year-search') {
      const event = events.find((e) => e.id === result.id);
      if (event) {
        setSelectedEvent(event);
      }
    }
    
    setIsSearching(false);
    setSearchQuery("");
    setYearNotFound(false);
    
    // Scroll to events section
    setTimeout(() => {
      scrollToEventsSection();
    }, 100);
  };

  const handleTimelineScroll = (direction) => {
    const timelineContainer = timelineRef.current;
    if (timelineContainer) {
      const scrollAmount = 200;
      timelineContainer.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleYearSelect = (e) => {
    const year = parseInt(e.target.value);
    if (years.includes(year)) {
      handleYearClick(year);
    }
  };

  // Handle direct year input in search (e.g., pressing Enter)
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      const query = searchQuery.trim();
      const isYearSearch = /^\d+$/.test(query);
      
      if (isYearSearch) {
        const year = parseInt(query);
        const yearExists = years.includes(year);
        
        if (yearExists) {
          handleYearClick(year);
        } else {
          setYearNotFound(true);
          setIsSearching(true);
          setSearchResults([]);
        }
        e.preventDefault();
      }
    }
  };

  return (
    <div className="timeline-container">
      <div className="timeline-header">
        <h1>Maharashtra Historical Timeline</h1>
        <p className="subtitle">
          Explore the rich history of Maharashtra from ancient times to modern days
        </p>

        {/* Search and Year Selector */}
        <div className="controls-container">
          <div className="search-wrapper">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by year, event, location, or keyword..."
                value={searchQuery}
                onChange={handleSearch}
                onKeyDown={handleSearchKeyDown}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Search Results */}
            {isSearching && (
              <div className="search-results">
                <div className="search-results-header">
                  <span>
                    {yearNotFound 
                      ? "Year not found" 
                      : searchResults.length > 0 
                        ? `${searchResults.length} result${searchResults.length > 1 ? 's' : ''} found`
                        : "Searching..."
                    }
                  </span>
                  <button
                    onClick={() => {
                      setIsSearching(false);
                      setYearNotFound(false);
                    }}
                    className="close-results"
                  >
                    ×
                  </button>
                </div>
                
                {/* Year Not Found Message */}
                {yearNotFound && (
                  <div className="year-not-found">
                    <div className="year-not-found-icon">📅</div>
                    <div className="year-not-found-content">
                      <h4>Year "{searchQuery}" Not Found</h4>
                      <p>The year {searchQuery} is not available in our timeline database.</p>
                      <p>Try searching between {years[0]} and {years[years.length - 1]}</p>
                      <div className="suggested-years">
                        <span>Suggested years:</span>
                        <button onClick={() => handleYearClick(1630)}>1630 (Shivaji's Birth)</button>
                        <button onClick={() => handleYearClick(1674)}>1674 (Maratha Empire)</button>
                        <button onClick={() => handleYearClick(1818)}>1818 (British Rule)</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {!yearNotFound && searchResults.length > 0 && (
                  <>
                    {searchResults.map((result, index) => (
                      <div
                        key={`${result.year}-${result.id}-${index}`}
                        className="search-result-item"
                        onClick={() => handleSearchResultClick(result)}
                      >
                        <div className="result-year-badge">{result.year}</div>
                        <div className="result-content">
                          <h4>{result.title}</h4>
                          <p>{result.shortDescription}</p>
                          <div className="result-meta">
                            <span className="result-category">
                              {result.category}
                            </span>
                            <span className="result-location">
                              {result.location}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* No Results Found */}
                {!yearNotFound && searchQuery.trim() !== "" && searchResults.length === 0 && (
                  <div className="no-search-results">
                    <div className="no-results-icon">🔍</div>
                    <div className="no-results-content">
                      <h4>No Results Found</h4>
                      <p>No matches found for "{searchQuery}"</p>
                      <p>Try searching with different keywords or browse the timeline.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="year-selector">
            <label htmlFor="yearSelect">Jump to Year:</label>
            <select
              id="yearSelect"
              value={selectedYear}
              onChange={handleYearSelect}
              className="year-dropdown"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year} {year === 1630 ? "(Shivaji's Birth)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="main-timeline-section">
        <div className="timeline-info">
          <div className="selected-year-info">
            <h2>
              Currently Viewing:{" "}
              <span className="year-highlight">{selectedYear}</span>
            </h2>
            <div className="era-badge">{currentEra}</div>
            <div className="events-count">
              {yearEvents.length} Historical Events
            </div>
          </div>

          <div className="timeline-navigation">
            <button
              className="nav-button prev"
              onClick={() => {
                const currentIndex = years.indexOf(selectedYear);
                if (currentIndex > 0) {
                  handleYearClick(years[currentIndex - 1]);
                }
              }}
              disabled={years.indexOf(selectedYear) === 0}
            >
              ← Previous Year
            </button>
            <button
              className="nav-button next"
              onClick={() => {
                const currentIndex = years.indexOf(selectedYear);
                if (currentIndex < years.length - 1) {
                  handleYearClick(years[currentIndex + 1]);
                }
              }}
              disabled={years.indexOf(selectedYear) === years.length - 1}
            >
              Next Year →
            </button>
          </div>
        </div>

        {/* Horizontal Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-scroll-controls">
            <button
              className="scroll-button left"
              onClick={() => handleTimelineScroll("prev")}
            >
              ←
            </button>
            <div className="timeline-track" ref={timelineRef}>
              <div className="timeline-line">
                {years.map((year) => (
                  <div
                    key={year}
                    className={`timeline-year ${
                      year === selectedYear ? "active" : ""
                    }`}
                    onClick={() => handleYearClick(year)}
                  >
                    <div className="year-marker">
                      <div className="marker-dot"></div>
                      {year === selectedYear && (
                        <div className="active-ring"></div>
                      )}
                    </div>
                    <div className="year-label">
                      <span className="year-number">{year}</span>
                      <span className="event-count">
                        {maharashtraHistoricalEvents.find(
                          (e) => e.year === year
                        )?.events?.length || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="scroll-button right"
              onClick={() => handleTimelineScroll("next")}
            >
              →
            </button>
          </div>
          <div className="timeline-guide">
            <div className="timeline-start">{years[0]} CE</div>
            <div className="timeline-middle">Historical Timeline</div>
            <div className="timeline-end">{years[years.length - 1]} CE</div>
          </div>
        </div>
      </div>

      {/* Events Section with ref */}
      <div className="events-section" ref={eventsSectionRef}>
        <div className="events-header">
          <h3>Historical Events in {selectedYear}</h3>
          {selectedYear < 1630 && (
            <div className="pre-shivaji-note">
              <span className="note-icon">📜</span>
              Pre-Shivaji Maharaj Era
            </div>
          )}
        </div>

        {yearEvents.length > 0 ? (
          <div className="events-grid">
            {yearEvents.map((event) => (
              <div
                key={event.id}
                className="event-card"
                onClick={() => handleEventClick(event)}
              >
                <div className="event-image-container">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="event-image"
                  />
                  <div className="event-image-overlay">
                    <span className="event-category">{event.category}</span>
                    <span className="event-location">{event.location}</span>
                  </div>
                </div>
                <div className="event-content">
                  <div className="event-date">{event.date}</div>
                  <h4 className="event-title">{event.title}</h4>
                  <p className="event-description">{event.shortDescription}</p>
                  <div className="event-tags">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="event-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="view-details-btn">
                    View Details
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <div className="no-events-icon">📅</div>
            <h4>No Historical Events Found</h4>
            <p>
              There are no recorded historical events for {selectedYear} in our
              database.
            </p>
            <p>Try selecting a different year from the timeline.</p>
            <div className="suggested-years">
              <span>Suggested years with events:</span>
              <button onClick={() => handleYearClick(1630)}>1630 (Shivaji's Birth)</button>
              <button onClick={() => handleYearClick(1674)}>1674 (Maratha Empire)</button>
              <button onClick={() => handleYearClick(1818)}>1818 (British Rule)</button>
            </div>
          </div>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="event-modal-overlay" onClick={handleCloseEvent}>
          <div className="event-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={handleCloseEvent}>
              ×
            </button>
            <div className="modal-header">
              <div className="modal-image-container">
                <img src={selectedEvent.imageUrl} alt={selectedEvent.title} />
                <div className="modal-image-gradient"></div>
              </div>
              <div className="modal-title-section">
                <div className="modal-meta">
                  <span className="modal-year">{selectedYear}</span>
                  <span className="modal-category">
                    {selectedEvent.category}
                  </span>
                  <span className="modal-location">
                    {selectedEvent.location}
                  </span>
                </div>
                <h2>{selectedEvent.title}</h2>
                <div className="modal-date">{selectedEvent.date}</div>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-section">
                <h3>Event Description</h3>
                <p className="modal-description">
                  {selectedEvent.fullDescription}
                </p>
              </div>

              <div className="modal-section">
                <h3>Historical Context</h3>
                <div className="historical-context">
                  <div className="context-item">
                    <span className="context-label">Era:</span>
                    <span className="context-value">{currentEra}</span>
                  </div>
                  <div className="context-item">
                    <span className="context-label">Significance:</span>
                    <span className="context-value">
                      {selectedYear < 1630
                        ? "This event occurred during the pre-Shivaji era, when Maharashtra was under various dynasties and sultanates."
                        : selectedYear === 1630
                        ? "This year marks the birth of Chhatrapati Shivaji Maharaj, founder of the Maratha Empire."
                        : "This event took place during the Maratha Empire period, a significant era in Maharashtra's history."}
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-section">
                <h3>Tags & Keywords</h3>
                <div className="modal-tags">
                  {selectedEvent.tags.map((tag, index) => (
                    <span key={index} className="modal-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
           
            <div className="modal-footer">
              <div className="modal-actions">
                <button
                  className="modal-button close"
                  onClick={handleCloseEvent}
                >
                  Close
                </button>
              </div>
              <div className="modal-note">
                <span className="note-icon">💡</span>
                This information is part of Maharashtra's rich historical heritage
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="timeline-footer">
        <p>
          Maharashtra Historical Timeline • From {years[0]} CE to{" "}
          {years[years.length - 1]} CE
        </p>
        <p className="footer-note">
          Explore Maharashtra's glorious history through centuries
        </p>
      </div>
    </div>
  );
};

export default Timeline;
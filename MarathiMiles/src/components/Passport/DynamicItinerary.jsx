import React, { useState, useEffect } from 'react';

/**
 * Dynamic Itinerary Planner Component
 * Generates custom itineraries based on user's arrival time and available duration
 */
const DynamicItinerary = ({ activities, rules }) => {
    const [arrivalTime, setArrivalTime] = useState('08:00');
    const [totalHours, setTotalHours] = useState(2);
    const [generatedItinerary, setGeneratedItinerary] = useState([]);

    // Convert time string (HH:MM) to minutes from midnight
    const timeToMinutes = (timeStr) => {
        const [hours, minutes] = timeStr.split(':').map(Number);
        return hours * 60 + minutes;
    };

    // Convert minutes from midnight to time string (HH:MM)
    const minutesToTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    // Smart itinerary generation algorithm
    const generateSmartItinerary = (startTime, durationHours) => {
        const startMinutes = timeToMinutes(startTime);
        const totalAvailableMinutes = durationHours * 60;
        let currentTime = startMinutes;
        const schedule = [];
        let accumulatedTime = 0;

        // Filter and prioritize activities
        const essential = activities.filter(a => a.priority === 'essential');
        const medium = activities.filter(a => a.priority === 'medium');
        const optional = activities.filter(a => a.priority === 'optional');

        // Calculate essential time needed
        const essentialDuration = essential.reduce((sum, a) => sum + a.duration + rules.walkingSpeedMinutes, 0);

        // Check if we can fit all essentials
        if (essentialDuration > totalAvailableMinutes) {
            return [{
                startTime: minutesToTime(currentTime),
                endTime: minutesToTime(currentTime + totalAvailableMinutes),
                activity: 'Warning: Insufficient Time',
                description: `You need at least ${Math.ceil(essentialDuration / 60)} hours to visit essential points. Please extend your duration or select a shorter visit.`,
                category: 'warning'
            }];
        }

        // Function to add activity to schedule
        const addActivity = (activity) => {
            const startTimeStr = minutesToTime(currentTime);
            currentTime += activity.duration;
            const endTimeStr = minutesToTime(currentTime);

            schedule.push({
                startTime: startTimeStr,
                endTime: endTimeStr,
                activity: activity.name,
                description: activity.description,
                category: activity.category,
                duration: activity.duration
            });

            accumulatedTime += activity.duration;

            // Add walking time
            currentTime += rules.walkingSpeedMinutes;
            accumulatedTime += rules.walkingSpeedMinutes;
        };

        // Add all essential activities
        essential.forEach(activity => {
            addActivity(activity);
        });

        // Remaining time after essentials
        const remainingMinutes = totalAvailableMinutes - accumulatedTime;

        // Add break if needed
        if (accumulatedTime >= rules.minimumBreakAfterMinutes && remainingMinutes >= 10) {
            const breakActivity = activities.find(a => a.id === 'rest_break');
            if (breakActivity) {
                addActivity(breakActivity);
            }
        }

        // Try to fit medium priority activities
        for (const activity of medium) {
            const timeNeeded = activity.duration + rules.walkingSpeedMinutes;
            if (accumulatedTime + timeNeeded <= totalAvailableMinutes) {
                addActivity(activity);
            }
        }

        // Try to fit optional activities if time permits
        for (const activity of optional) {
            if (activity.id === 'rest_break') continue; // Skip break, already handled
            const timeNeeded = activity.duration + rules.walkingSpeedMinutes;
            if (accumulatedTime + timeNeeded <= totalAvailableMinutes) {
                addActivity(activity);
            }
        }

        // Add descent/exit
        const timeLeft = totalAvailableMinutes - accumulatedTime;
        if (timeLeft >= 10) {
            schedule.push({
                startTime: minutesToTime(currentTime),
                endTime: minutesToTime(startMinutes + totalAvailableMinutes),
                activity: 'Descent & Exit',
                description: 'Return journey to the base of the fort',
                category: 'exit',
                duration: timeLeft
            });
        }

        return schedule;
    };

    // Regenerate itinerary when inputs change
    useEffect(() => {
        if (!activities || !rules) return;
        const itinerary = generateSmartItinerary(arrivalTime, totalHours);
        setGeneratedItinerary(itinerary);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arrivalTime, totalHours]);

    return (
        <div className="dynamic-itinerary-planner">
            {/* Header */}
            <div className="itinerary-header">
                <h3 className="itinerary-main-title">Plan Your Visit</h3>
                <p className="itinerary-subtitle">How Much Time Do You Have?</p>
            </div>

            {/* Time Selection Buttons */}
            <div className="time-selection-buttons">
                <button
                    className={`time-option-btn ${totalHours === 2 ? 'active' : ''}`}
                    onClick={() => setTotalHours(2)}
                >
                    2 hours
                </button>
                <button
                    className={`time-option-btn ${totalHours === 4 ? 'active' : ''}`}
                    onClick={() => setTotalHours(4)}
                >
                    4 hours
                </button>
                <button
                    className={`time-option-btn ${totalHours === 5 ? 'active' : ''}`}
                    onClick={() => setTotalHours(5)}
                >
                    Half day
                </button>
                <button
                    className={`time-option-btn ${totalHours === 8 ? 'active' : ''}`}
                    onClick={() => setTotalHours(8)}
                >
                    Full day
                </button>
            </div>

            {/* Arrival Time Input */}
            <div className="arrival-time-section">
                <label htmlFor="arrival-time" className="arrival-label">
                    What time will you arrive?
                </label>
                <input
                    id="arrival-time"
                    type="time"
                    value={arrivalTime}
                    onChange={(e) => setArrivalTime(e.target.value)}
                    className="arrival-time-input"
                />
            </div>

            {/* Generated Timeline */}
            <div className="generated-timeline">
                <h4 className="timeline-title">Your Personalized Itinerary</h4>
                <div className="timeline-list">
                    {generatedItinerary.map((slot, index) => (
                        <div
                            key={index}
                            className={`timeline-slot ${slot.category} ${slot.category === 'warning' ? 'warning-slot' : ''}`}
                        >
                            <div className="timeline-time-badge">
                                <span className="time-start">{slot.startTime}</span>
                                <span className="time-separator">→</span>
                                <span className="time-end">{slot.endTime}</span>
                            </div>
                            <div className="timeline-details">
                                <h5 className="timeline-activity-name">{slot.activity}</h5>
                                <p className="timeline-activity-desc">{slot.description}</p>
                                {slot.duration && slot.category !== 'warning' && (
                                    <span className="duration-badge">{slot.duration} min</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Footer */}
                {generatedItinerary.length > 0 && generatedItinerary[0].category !== 'warning' && (
                    <div className="itinerary-summary">
                        <p className="summary-text">
                            📍 <strong>{generatedItinerary.length}</strong> activities planned •
                            Starts at <strong>{arrivalTime}</strong> •
                            Duration: <strong>{totalHours}h</strong>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DynamicItinerary;

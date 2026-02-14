// Adaptive Route Analytics Dashboard
// Displays visitor patterns, popular spots, and learning insights

import React from 'react';
import { getFortAnalytics, getLocationStatsByFort, getConfig } from '../../services/adaptiveDatabase';
import './AdaptiveAnalytics.css';

const AdaptiveAnalytics = ({ fortId, fortGraph }) => {
    const analytics = getFortAnalytics(fortId);
    const locationStats = getLocationStatsByFort(fortId);
    const config = getConfig();

    if (!analytics || !config.enabled) {
        return (
            <div className="adaptive-analytics-placeholder">
                <div className="placeholder-icon">📊</div>
                <p className="placeholder-text">No visitor data yet</p>
                <p className="placeholder-subtext">
                    The system will learn from user interactions to optimize routes
                </p>
            </div>
        );
    }

    // Get node names from graph
    const getNodeName = (locationId) => {
        const node = fortGraph?.nodes?.[locationId];
        return node?.name || locationId;
    };

    return (
        <div className="adaptive-analytics-panel">
            <div className="analytics-header">
                <div className="analytics-badge">
                    <span className="badge-icon">🧠</span>
                    <span className="badge-text">Adaptive Learning Active</span>
                </div>
                <div className="analytics-meta">
                    <span className="meta-item">
                        <span className="meta-icon">👥</span>
                        {analytics.total_visitors} visitor patterns analyzed
                    </span>
                </div>
            </div>

            <div className="analytics-grid">
                {/* Popular Spots */}
                {analytics.popular_spots.length > 0 && (
                    <div className="analytics-card">
                        <h4 className="card-title">
                            <span className="title-icon">⭐</span>
                            Popular Spots
                        </h4>
                        <p className="card-subtitle">Most clicked by visitors</p>
                        <div className="analytics-list">
                            {analytics.popular_spots.map((spot, index) => (
                                <div key={spot.location_id} className="analytics-item">
                                    <div className="item-rank">#{index + 1}</div>
                                    <div className="item-content">
                                        <div className="item-name">{getNodeName(spot.location_id)}</div>
                                        <div className="item-stat">{spot.clicks} clicks</div>
                                    </div>
                                    <div className="item-bar">
                                        <div
                                            className="item-bar-fill popular"
                                            style={{
                                                width: `${(spot.clicks / Math.max(...analytics.popular_spots.map(s => s.clicks))) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Frequently Skipped */}
                {analytics.skipped_spots.length > 0 && (
                    <div className="analytics-card">
                        <h4 className="card-title">
                            <span className="title-icon">⏭️</span>
                            Frequently Skipped
                        </h4>
                        <p className="card-subtitle">Often excluded from routes</p>
                        <div className="analytics-list">
                            {analytics.skipped_spots.map((spot, index) => (
                                <div key={spot.location_id} className="analytics-item">
                                    <div className="item-rank">#{index + 1}</div>
                                    <div className="item-content">
                                        <div className="item-name">{getNodeName(spot.location_id)}</div>
                                        <div className="item-stat">{spot.skips} skips</div>
                                    </div>
                                    <div className="item-bar">
                                        <div
                                            className="item-bar-fill skipped"
                                            style={{
                                                width: `${(spot.skips / Math.max(...analytics.skipped_spots.map(s => s.skips))) * 100}%`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Average Visit Duration */}
                {analytics.avg_durations.length > 0 && (
                    <div className="analytics-card analytics-card-wide">
                        <h4 className="card-title">
                            <span className="title-icon">⏱️</span>
                            Average Visit Duration
                        </h4>
                        <p className="card-subtitle">Time spent per location</p>
                        <div className="analytics-duration-grid">
                            {analytics.avg_durations
                                .filter(d => parseFloat(d.avg_duration) > 0)
                                .sort((a, b) => parseFloat(b.avg_duration) - parseFloat(a.avg_duration))
                                .slice(0, 6)
                                .map(duration => (
                                    <div key={duration.location_id} className="duration-item">
                                        <div className="duration-location">{getNodeName(duration.location_id)}</div>
                                        <div className="duration-time">
                                            <span className="duration-value">{duration.avg_duration}</span>
                                            <span className="duration-unit">min</span>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="analytics-footer">
                <div className="footer-stats">
                    <div className="footer-stat-item">
                        <span className="footer-stat-icon">📈</span>
                        <span className="footer-stat-text">
                            {locationStats.length} locations tracked
                        </span>
                    </div>
                    <div className="footer-stat-item">
                        <span className="footer-stat-icon">🎯</span>
                        <span className="footer-stat-text">
                            Routes optimized using behavioral patterns
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdaptiveAnalytics;

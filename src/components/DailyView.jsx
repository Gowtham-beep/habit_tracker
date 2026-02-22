import { useState } from 'react';
import { Check } from 'lucide-react';

export const DailyView = ({ date, schedule, completion, onToggle }) => {
    const completedCount = Object.values(completion).filter(Boolean).length;
    const totalCount = schedule.length;
    const percentage = Math.round((completedCount / totalCount) * 100);

    return (
        <div className="daily-view">
            <div className="daily-header">
                <h2>{date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h2>
                <div className="progress-section">
                    <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="progress-text">{completedCount} / {totalCount} ({percentage}%)</span>
                </div>
            </div>

            <div className="activities-grid">
                {schedule.map((activity, index) => (
                    <div
                        key={index}
                        className={`activity-card ${completion[index] ? 'completed' : ''}`}
                        onClick={() => onToggle(index)}
                    >
                        <div className="activity-checkbox">
                            {completion[index] && <Check size={18} />}
                        </div>
                        <div className="activity-content">
                            <div className="activity-time">{activity.time}</div>
                            <div className="activity-title">{activity.activity}</div>
                            {(activity.focusLayer || activity.details) && (
                                <div className="activity-details">{activity.focusLayer || activity.details}</div>
                            )}
                            {(activity.mindset || activity.purpose) && (
                                <div className="activity-purpose">{activity.mindset || activity.purpose}</div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

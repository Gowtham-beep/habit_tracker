import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, startOfYear, eachWeekOfInterval, startOfWeek } from 'date-fns';

export const Analytics = ({ streakData, analyticsData }) => {
    // Group streak data by weeks for GitHub-style grid
    const weeks = [];
    const today = new Date();
    const yearStart = new Date(today);
    yearStart.setDate(yearStart.getDate() - 364);

    let currentWeek = [];
    streakData.forEach((day, index) => {
        currentWeek.push(day);
        if (currentWeek.length === 7 || index === streakData.length - 1) {
            weeks.push([...currentWeek]);
            currentWeek = [];
        }
    });

    const getColorForLevel = (level) => {
        const colors = ['var(--streak-0)', 'var(--streak-1)', 'var(--streak-2)', 'var(--streak-3)', 'var(--streak-4)'];
        return colors[level] || colors[0];
    };

    const totalDays = streakData.length;
    const completedDays = streakData.filter(d => d.percentage > 0).length;
    const avgCompletion = Math.round(streakData.reduce((sum, d) => sum + d.percentage, 0) / totalDays);

    return (
        <div className="analytics-view">
            <div className="stats-cards">
                <div className="stat-card">
                    <div className="stat-value">{completedDays}</div>
                    <div className="stat-label">Active Days</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{avgCompletion}%</div>
                    <div className="stat-label">Avg Completion</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{totalDays}</div>
                    <div className="stat-label">Days Tracked</div>
                </div>
            </div>

            <div className="streak-section">
                <h3>365-Day Streak</h3>
                <div className="streak-grid">
                    <div className="weekday-labels">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                    </div>
                    <div className="weeks-container">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="week-column">
                                {week.map((day, dayIndex) => (
                                    <div
                                        key={day.date}
                                        className="streak-cell"
                                        style={{ backgroundColor: getColorForLevel(day.level) }}
                                        title={`${day.date}: ${day.percentage}%`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="streak-legend">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(level => (
                        <div key={level} className="legend-cell" style={{ backgroundColor: getColorForLevel(level) }} />
                    ))}
                    <span>More</span>
                </div>
            </div>

            <div className="chart-section">
                <h3>Last 30 Days Completion</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analyticsData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                        <XAxis dataKey="date" stroke="var(--text-secondary)" />
                        <YAxis stroke="var(--text-secondary)" />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--card-bg)',
                                border: '1px solid var(--border)',
                                borderRadius: '8px'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="completion"
                            stroke="var(--accent)"
                            strokeWidth={3}
                            dot={{ fill: 'var(--accent)', r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

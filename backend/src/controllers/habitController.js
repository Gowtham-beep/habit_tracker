import pool from '../config/database.js';

export const getHabitLogs = async (req, res) => {
    const userId = req.userId;
    const { start, end } = req.query;

    try {
        let query = 'SELECT date, completion_data FROM habit_logs WHERE user_id = $1';
        const params = [userId];

        if (start && end) {
            query += ' AND date BETWEEN $2 AND $3 ORDER BY date ASC';
            params.push(start, end);
        } else if (start) {
            query += ' AND date >= $2 ORDER BY date ASC';
            params.push(start);
        } else if (end) {
            query += ' AND date <= $2 ORDER BY date ASC';
            params.push(end);
        } else {
            query += ' ORDER BY date ASC';
        }

        const result = await pool.query(query, params);

        // Transform to object format: { "2026-01-15": { 0: true, 1: false, ... }, ... }
        const habitData = {};
        result.rows.forEach(row => {
            const dateKey = row.date.toISOString().split('T')[0];
            habitData[dateKey] = row.completion_data;
        });

        res.json({ habitData });
    } catch (error) {
        console.error('Get habit logs error:', error);
        res.status(500).json({ error: 'Failed to fetch habit logs' });
    }
};

export const updateHabitLog = async (req, res) => {
    const userId = req.userId;
    const { date } = req.params;
    const { completionData } = req.body;

    try {
        // Validate date format
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
        }

        // Upsert habit log
        const result = await pool.query(
            `INSERT INTO habit_logs (user_id, date, completion_data)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, date)
       DO UPDATE SET completion_data = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING date, completion_data`,
            [userId, date, JSON.stringify(completionData)]
        );

        const dateKey = result.rows[0].date.toISOString().split('T')[0];

        res.json({
            message: 'Habit log updated successfully',
            date: dateKey,
            completionData: result.rows[0].completion_data
        });
    } catch (error) {
        console.error('Update habit log error:', error);
        res.status(500).json({ error: 'Failed to update habit log' });
    }
};

export const toggleActivity = async (req, res) => {
    const userId = req.userId;
    const { date, index } = req.params;

    try {
        // Validate inputs
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD' });
        }

        const activityIndex = parseInt(index);
        if (isNaN(activityIndex) || activityIndex < 0) {
            return res.status(400).json({ error: 'Invalid activity index' });
        }

        // Get current log or create empty one
        const currentLog = await pool.query(
            'SELECT completion_data FROM habit_logs WHERE user_id = $1 AND date = $2',
            [userId, date]
        );

        let completionData = {};
        if (currentLog.rows.length > 0) {
            completionData = currentLog.rows[0].completion_data;
        }

        // Toggle the activity
        completionData[activityIndex] = !completionData[activityIndex];

        // Upsert
        const result = await pool.query(
            `INSERT INTO habit_logs (user_id, date, completion_data)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, date)
       DO UPDATE SET completion_data = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING date, completion_data`,
            [userId, date, JSON.stringify(completionData)]
        );

        const dateKey = result.rows[0].date.toISOString().split('T')[0];

        res.json({
            message: 'Activity toggled successfully',
            date: dateKey,
            completionData: result.rows[0].completion_data
        });
    } catch (error) {
        console.error('Toggle activity error:', error);
        res.status(500).json({ error: 'Failed to toggle activity' });
    }
};

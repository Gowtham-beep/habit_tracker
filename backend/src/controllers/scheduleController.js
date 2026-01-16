import pool from '../config/database.js';

export const getSchedules = async (req, res) => {
    const userId = req.userId;

    try {
        const result = await pool.query(
            'SELECT type, activities FROM schedules WHERE user_id = $1',
            [userId]
        );

        const schedules = {
            weekday: [],
            weekend: []
        };

        result.rows.forEach(row => {
            schedules[row.type] = row.activities;
        });

        res.json({ schedules });
    } catch (error) {
        console.error('Get schedules error:', error);
        res.status(500).json({ error: 'Failed to fetch schedules' });
    }
};

export const updateSchedule = async (req, res) => {
    const userId = req.userId;
    const { type } = req.params;
    const { activities } = req.body;

    try {
        // Validate type
        if (type !== 'weekday' && type !== 'weekend') {
            return res.status(400).json({ error: 'Invalid schedule type. Must be "weekday" or "weekend"' });
        }

        // Validate activities
        if (!Array.isArray(activities)) {
            return res.status(400).json({ error: 'Activities must be an array' });
        }

        // Update schedule
        const result = await pool.query(
            `INSERT INTO schedules (user_id, type, activities)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, type)
       DO UPDATE SET activities = $3, updated_at = CURRENT_TIMESTAMP
       RETURNING type, activities, updated_at`,
            [userId, type, JSON.stringify(activities)]
        );

        res.json({
            message: 'Schedule updated successfully',
            type: result.rows[0].type,
            activities: result.rows[0].activities,
            updatedAt: result.rows[0].updated_at
        });
    } catch (error) {
        console.error('Update schedule error:', error);
        res.status(500).json({ error: 'Failed to update schedule' });
    }
};

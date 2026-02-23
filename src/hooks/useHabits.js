import { useState, useEffect } from 'react';
import { format, startOfDay } from 'date-fns';
import { WEEKDAY_SCHEDULE, WEEKEND_SCHEDULE } from '../data/initialSchedule';
import apiService from '../services/api';

const STORAGE_KEY = 'habit_tracker_data';
const SCHEDULE_KEY = 'habit_tracker_schedules';

export const useHabits = (isAuthenticated = false) => {
    const [habitData, setHabitData] = useState({});
    const [schedules, setSchedules] = useState({
        weekday: WEEKDAY_SCHEDULE,
        weekend: WEEKEND_SCHEDULE
    });
    const [loading, setLoading] = useState(false);

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            if (isAuthenticated) {
                // Try to load from backend
                try {
                    setLoading(true);

                    // Load schedules
                    const schedulesData = await apiService.getSchedules();
                    if (schedulesData.schedules) {
                        setSchedules(schedulesData.schedules);
                    }

                    // Load habit logs for last 365 days
                    const today = new Date();
                    const yearAgo = new Date(today);
                    yearAgo.setDate(yearAgo.getDate() - 365);

                    const habitsData = await apiService.getHabitLogs(
                        format(yearAgo, 'yyyy-MM-dd'),
                        format(today, 'yyyy-MM-dd')
                    );

                    if (habitsData.habitData) {
                        setHabitData(habitsData.habitData);
                    }
                } catch (error) {
                    console.error('Failed to load from backend, using localStorage:', error);
                    loadFromLocalStorage();
                } finally {
                    setLoading(false);
                }
            } else {
                loadFromLocalStorage();
            }
        };

        loadData();
    }, [isAuthenticated]);

    const loadFromLocalStorage = () => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        const savedSchedules = localStorage.getItem(SCHEDULE_KEY);

        if (savedData) {
            setHabitData(JSON.parse(savedData));
        }

        if (savedSchedules) {
            setSchedules(JSON.parse(savedSchedules));
        }
    };

    // Save to localStorage as backup (always)
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habitData));
    }, [habitData]);

    useEffect(() => {
        localStorage.setItem(SCHEDULE_KEY, JSON.stringify(schedules));
    }, [schedules]);

    const getScheduleForDate = (date) => {
        const day = date.getDay();
        const isWeekend = day === 0 || day === 6;
        return isWeekend ? schedules.weekend : schedules.weekday;
    };

    const toggleActivity = async (date, activityIndex) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        const currentData = habitData[dateKey] || {};
        const completed = currentData[activityIndex] || false;

        const newData = {
            ...habitData,
            [dateKey]: {
                ...currentData,
                [activityIndex]: !completed
            }
        };

        setHabitData(newData);

        // Sync to backend if authenticated
        if (isAuthenticated) {
            try {
                await apiService.toggleActivity(dateKey, activityIndex);
            } catch (error) {
                console.error('Failed to sync to backend:', error);
            }
        }
    };

    const getCompletionForDate = (date) => {
        const dateKey = format(date, 'yyyy-MM-dd');
        return habitData[dateKey] || {};
    };

    const getCompletionPercentage = (date) => {
        const schedule = getScheduleForDate(date);
        const completion = getCompletionForDate(date);
        const completed = Object.values(completion).filter(Boolean).length;
        return Math.round((completed / schedule.length) * 100);
    };

    const updateSchedule = async (type, newSchedule) => {
        const newSchedules = {
            ...schedules,
            [type]: newSchedule
        };

        setSchedules(newSchedules);

        // Sync to backend if authenticated
        if (isAuthenticated) {
            try {
                await apiService.updateSchedule(type, newSchedule);
            } catch (error) {
                console.error('Failed to sync schedule to backend:', error);
            }
        }
    };

    const getStreakData = () => {
        const today = startOfDay(new Date());
        const data = [];

        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const percentage = getCompletionPercentage(date);

            data.push({
                date: format(date, 'yyyy-MM-dd'),
                percentage,
                level: percentage === 0 ? 0 : percentage < 25 ? 1 : percentage < 50 ? 2 : percentage < 75 ? 3 : 4
            });
        }

        return data;
    };

    const getAnalyticsData = () => {
        const last30Days = [];
        const today = startOfDay(new Date());

        for (let i = 29; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const percentage = getCompletionPercentage(date);

            last30Days.push({
                date: format(date, 'MMM dd'),
                completion: percentage
            });
        }

        return last30Days;
    };

    return {
        habitData,
        schedules,
        loading,
        getScheduleForDate,
        toggleActivity,
        getCompletionForDate,
        getCompletionPercentage,
        updateSchedule,
        getStreakData,
        getAnalyticsData
    };
};

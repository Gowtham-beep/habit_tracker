const TIME_KEYWORDS = {
    earlymorning: 5 * 60,
    morning: 8 * 60,
    latemorning: 10 * 60,
    noon: 12 * 60,
    afternoon: 14 * 60,
    evening: 18 * 60,
    night: 21 * 60,
    latenight: 23 * 60
};

const normalizeLabel = (value = '') => value.toLowerCase().replace(/[^a-z]/g, '');

const hasNightHint = (value = '') => {
    const normalized = value.toLowerCase();
    return /sleep|dinner|evening|night/.test(normalized);
};

const parseTimeToken = (time = '') => {
    const match = time.toLowerCase().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
    if (!match) {
        return Number.POSITIVE_INFINITY;
    }

    let hour = Number.parseInt(match[1], 10);
    const minute = Number.parseInt(match[2] || '0', 10);
    const meridiem = match[3];

    if (meridiem === 'pm' && hour < 12) {
        hour += 12;
    } else if (meridiem === 'am' && hour === 12) {
        hour = 0;
    }

    return (hour * 60) + minute;
};

export const getTimeSortValue = (item = {}) => {
    const timeText = (item.time || '').trim();
    const normalizedKeyword = normalizeLabel(timeText);

    if (Object.prototype.hasOwnProperty.call(TIME_KEYWORDS, normalizedKeyword)) {
        return TIME_KEYWORDS[normalizedKeyword];
    }

    const [startTime] = timeText.split(/[–-]/).map((part) => part.trim());
    let startMinutes = parseTimeToken(startTime);

    // If AM/PM is omitted, apply light heuristics for common schedule labels.
    if (!/\b(am|pm)\b/i.test(startTime) && Number.isFinite(startMinutes)) {
        const hour = Math.floor(startMinutes / 60);
        const hasAfternoonHint = hour >= 1 && hour <= 4;
        if (hasAfternoonHint || hasNightHint(`${timeText} ${item.activity || ''}`)) {
            startMinutes += 12 * 60;
        }
    }

    return startMinutes;
};

export const sortScheduleByTime = (schedule = []) => (
    [...schedule]
        .map((item, index) => ({ item, index }))
        .sort((a, b) => {
            const sortDiff = getTimeSortValue(a.item) - getTimeSortValue(b.item);
            return sortDiff !== 0 ? sortDiff : a.index - b.index;
        })
        .map(({ item }) => item)
);

const API_BASE_URL = 'http://localhost:3000/api';

class ApiService {
    constructor() {
        this.token = localStorage.getItem('auth_token');
    }

    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('auth_token', token);
        } else {
            localStorage.removeItem('auth_token');
        }
    }

    getToken() {
        return this.token;
    }

    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async register(email, password) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        this.setToken(data.token);
        return data;
    }

    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        this.setToken(data.token);
        return data;
    }

    async verifyToken() {
        return await this.request('/auth/verify');
    }

    logout() {
        this.setToken(null);
        localStorage.removeItem('user');
    }

    // Habit endpoints
    async getHabitLogs(startDate, endDate) {
        const params = new URLSearchParams();
        if (startDate) params.append('start', startDate);
        if (endDate) params.append('end', endDate);

        return await this.request(`/habits?${params.toString()}`);
    }

    async updateHabitLog(date, completionData) {
        return await this.request(`/habits/${date}`, {
            method: 'PUT',
            body: JSON.stringify({ completionData }),
        });
    }

    async toggleActivity(date, activityIndex) {
        return await this.request(`/habits/${date}/toggle/${activityIndex}`, {
            method: 'PATCH',
        });
    }

    // Schedule endpoints
    async getSchedules() {
        return await this.request('/schedules');
    }

    async updateSchedule(type, activities) {
        return await this.request(`/schedules/${type}`, {
            method: 'PUT',
            body: JSON.stringify({ activities }),
        });
    }
}

export default new ApiService();

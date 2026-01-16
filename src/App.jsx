import { useState, useEffect } from 'react';
import { Calendar, BarChart3, Settings, ChevronLeft, ChevronRight, LogOut } from 'lucide-react';
import { useHabits } from './hooks/useHabits';
import { DailyView } from './components/DailyView';
import { Analytics } from './components/Analytics';
import { ScheduleEditor } from './components/ScheduleEditor';
import { Auth } from './components/Auth';
import apiService from './services/api';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const {
    schedules,
    loading,
    getScheduleForDate,
    toggleActivity,
    getCompletionForDate,
    updateSchedule,
    getStreakData,
    getAnalyticsData
  } = useHabits(isAuthenticated);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = apiService.getToken();
      const savedUser = localStorage.getItem('user');

      if (token && savedUser) {
        try {
          await apiService.verifyToken();
          setUser(JSON.parse(savedUser));
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Token verification failed:', error);
          apiService.logout();
          localStorage.removeItem('user');
        }
      }
      setCheckingAuth(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    apiService.logout();
    setUser(null);
    setIsAuthenticated(false);
    setCurrentView('daily');
  };

  if (checkingAuth) {
    return (
      <div className="loading-screen">
        <div className="logo-icon">🎯</div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  const currentSchedule = getScheduleForDate(selectedDate);
  const currentCompletion = getCompletionForDate(selectedDate);

  const handleToggle = (index) => {
    toggleActivity(selectedDate, index);
  };

  const navigateDate = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);
  };

  const goToToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <div className="logo-icon">🎯</div>
          <h1>Habit Tracker</h1>
        </div>
        <div className="nav-links">
          <button
            className={currentView === 'daily' ? 'active' : ''}
            onClick={() => setCurrentView('daily')}
          >
            <Calendar size={20} />
            <span>Daily</span>
          </button>
          <button
            className={currentView === 'analytics' ? 'active' : ''}
            onClick={() => setCurrentView('analytics')}
          >
            <BarChart3 size={20} />
            <span>Analytics</span>
          </button>
          <button
            className={currentView === 'settings' ? 'active' : ''}
            onClick={() => setCurrentView('settings')}
          >
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button onClick={handleLogout} className="logout-btn" title="Logout">
            <LogOut size={20} />
            <span className="user-email">{user?.email}</span>
          </button>
        </div>
      </nav>

      <main className="main-content">
        {loading && (
          <div className="sync-indicator">
            <span>Syncing...</span>
          </div>
        )}

        {currentView === 'daily' && (
          <>
            <div className="date-navigation">
              <button onClick={() => navigateDate(-1)} className="nav-btn">
                <ChevronLeft size={20} />
              </button>
              <button onClick={goToToday} className="today-btn">
                Today
              </button>
              <button onClick={() => navigateDate(1)} className="nav-btn">
                <ChevronRight size={20} />
              </button>
            </div>
            <DailyView
              date={selectedDate}
              schedule={currentSchedule}
              completion={currentCompletion}
              onToggle={handleToggle}
            />
          </>
        )}

        {currentView === 'analytics' && (
          <Analytics
            streakData={getStreakData()}
            analyticsData={getAnalyticsData()}
          />
        )}

        {currentView === 'settings' && (
          <ScheduleEditor
            schedules={schedules}
            onUpdate={updateSchedule}
          />
        )}
      </main>
    </div>
  );
}

export default App;

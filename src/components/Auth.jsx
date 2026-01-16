import { useState } from 'react';
import { LogIn, UserPlus, X } from 'lucide-react';
import apiService from '../services/api';

export const Auth = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let result;
            if (isLogin) {
                result = await apiService.login(email, password);
            } else {
                result = await apiService.register(email, password);
            }

            localStorage.setItem('user', JSON.stringify(result.user));
            onAuthSuccess(result.user);
        } catch (err) {
            setError(err.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-overlay">
            <div className="auth-container">
                <div className="auth-header">
                    <div className="logo-section">
                        <div className="logo-icon">🎯</div>
                        <h1>Habit Tracker</h1>
                    </div>
                    <p className="auth-subtitle">
                        {isLogin ? 'Welcome back! Sign in to continue' : 'Create an account to start tracking'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {error && (
                        <div className="error-message">
                            <X size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                            autoComplete={isLogin ? 'current-password' : 'new-password'}
                        />
                        {!isLogin && (
                            <small className="form-hint">Minimum 6 characters</small>
                        )}
                    </div>

                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading ? (
                            <span>Loading...</span>
                        ) : (
                            <>
                                {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
                        {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>

                <div className="auth-note">
                    <p>💡 Your data will be synced across all your devices</p>
                </div>
            </div>
        </div>
    );
};

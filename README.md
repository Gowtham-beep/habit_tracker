# Habit Tracker - Quick Start Guide

## 🚀 Starting the Application

### Terminal 1: Start Backend
```bash
cd /home/gowtham-n/Desktop/habit_tracker/backend
npm run dev
```
✅ Backend running on: http://localhost:3000

### Terminal 2: Start Frontend
```bash
cd /home/gowtham-n/Desktop/habit_tracker
npm run dev
```
✅ Frontend running on: http://localhost:5173

## 📱 Using the App

1. **Open** http://localhost:5173 in your browser
2. **Register** a new account (email + password)
3. **Start tracking** your daily habits
4. **View analytics** to see your progress
5. **Customize** your schedule in Settings

## 🔐 Your First Account

Create an account with:
- **Email**: your-email@example.com
- **Password**: minimum 6 characters

Your data will be saved to the PostgreSQL database and synced across all devices!

## ✨ Features

- ✅ Daily habit tracking with checkboxes
- ✅ GitHub-style 365-day streak graph
- ✅ Completion analytics and charts
- ✅ Editable weekday/weekend schedules
- ✅ Multi-device synchronization
- ✅ Secure authentication with JWT
- ✅ Premium dark-mode UI

## 🎯 What's Different from Before?

**Before (LocalStorage only):**
- Data only on one browser
- No user accounts
- No multi-device sync

**Now (Full-Stack):**
- ☁️ Data stored in PostgreSQL cloud database
- 🔐 Secure user authentication
- 📱 Access from any device
- 🔄 Automatic synchronization

## 📊 Database Info

Your PostgreSQL database is hosted on **Aiven Cloud** with:
- ✅ SSL encryption
- ✅ Automatic backups
- ✅ High availability
- ✅ Production-ready infrastructure

## 🛠️ Troubleshooting

**Backend won't start?**
```bash
cd backend
npm install
npm run dev
```

**Frontend won't start?**
```bash
npm install
npm run dev
```

**Can't connect to database?**
- Check `backend/.env` file exists
- Verify DATABASE_URL is correct
- Ensure internet connection is active

## 📚 Documentation

For complete documentation, see the walkthrough in the artifacts folder.

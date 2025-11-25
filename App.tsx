import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ScheduleBuilderPage from './pages/ScheduleBuilderPage';
import MySchedulePage from './pages/MySchedulePage';
import LoginPage from './pages/LoginPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { ScheduleProvider } from './context/ScheduleContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/builder" element={<ScheduleBuilderPage />} />
          <Route path="/my-schedule" element={<MySchedulePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ScheduleProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <ProtectedRoutes />
          </div>
        </Router>
      </ScheduleProvider>
    </AuthProvider>
  );
};

export default App;

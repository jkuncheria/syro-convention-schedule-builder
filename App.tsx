import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import ScheduleBuilderPage from './pages/ScheduleBuilderPage';
import MySchedulePage from './pages/MySchedulePage';
import LoginPage from './pages/LoginPage';
import { ScheduleProvider } from './context/ScheduleContext';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

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

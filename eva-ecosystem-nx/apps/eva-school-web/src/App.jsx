import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import Students from './pages/Students';
import Settings from './pages/Settings';
import Finance from './pages/Finance';
import LessonArchitect from './pages/LessonArchitect';
import CommandBar from './components/CommandBar';

function App() {
  const [isCommandBarOpen, setIsCommandBarOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandBarOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CommandBar isOpen={isCommandBarOpen} onClose={() => setIsCommandBarOpen(false)} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard onOpenCommandBar={() => setIsCommandBarOpen(true)} />
              </PrivateRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="students" element={<Students />} />
            <Route path="finance" element={<Finance />} />
            <Route path="lessons" element={<LessonArchitect />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
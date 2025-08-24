// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import QuizListPage from './pages/QuizListPage'; // 1. Make sure this line is importing the new page
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quizzes" element={<QuizListPage />} /> {/* 2. This line adds the route */}
          {/* We will add more routes here later */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
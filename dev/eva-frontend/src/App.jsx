// src/App.jsx

import { Routes, Route } from 'react-router-dom';

// --- Import All Pages ---
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import QuizListPage from './pages/QuizListPage';
import QuizTakingPage from './pages/QuizTakingPage';
import TeacherDashboardPage from './pages/teacher/TeacherDashboardPage';
import QuestionManagementPage from './pages/teacher/QuestionManagementPage';
import AiQuizGeneratorPage from './pages/teacher/AiQuizGeneratorPage';
import ManageQuizzesPage from './pages/teacher/ManageQuizzesPage'; // <-- New import

// --- Import All Components ---
import Layout from './components/Layout';
import TeacherLayout from './components/TeacherLayout';
import ProtectedRoute from './components/ProtectedRoute';
import TeacherProtectedRoute from './components/TeacherProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<AuthPage />} />

      {/* Student Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/quizzes" element={<QuizListPage />} />
          <Route path="/quiz/:quizId" element={<QuizTakingPage />} />
        </Route>
      </Route>

      {/* Teacher Protected Routes */}
      <Route path="/teacher" element={<TeacherProtectedRoute />}> 
        <Route element={<TeacherLayout />}>
          <Route path="dashboard" element={<TeacherDashboardPage />} />
          <Route path="questions" element={<QuestionManagementPage />} />
          <Route path="ai-generator" element={<AiQuizGeneratorPage />} />
          <Route path="quizzes" element={<ManageQuizzesPage />} /> {/* <-- Add new quizzes route */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
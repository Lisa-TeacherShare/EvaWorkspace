// src/pages/teacher/TeacherDashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white">Teacher Dashboard</h1>
      <p className="text-gray-400 mt-2">Create and manage your educational content.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/teacher/questions" className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors">
          <h3 className="text-xl font-bold text-white">Manage Questions</h3>
          <p className="text-sm text-gray-400 mt-2">Create, view, and edit individual questions.</p>
        </Link>
        
        <Link to="/teacher/quizzes" className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors">
          <h3 className="text-xl font-bold text-white">Manage Quizzes</h3>
          <p className="text-sm text-gray-400 mt-2">Assemble questions into timed quizzes for students.</p>
        </Link>

        {/* --- NEW CARD ADDED HERE --- */}
        <Link to="/teacher/ai-generator" className="bg-cyan-800 p-6 rounded-lg text-center hover:bg-cyan-700 transition-colors">
          <h3 className="text-xl font-bold text-white">Generate Quiz with AI ✨</h3>
          <p className="text-sm text-gray-300 mt-2">Paste text to automatically create a quiz.</p>
        </Link>
        {/* --- END OF NEW CARD --- */}
      </div>
    </div>
  );
};

export default TeacherDashboardPage;
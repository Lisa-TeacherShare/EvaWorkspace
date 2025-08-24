// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // <-- 1. Import Link
import axios from 'axios';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  // ... (keep the existing state and useEffect code)

  // ... (keep the loading and error return statements)

  return (
    <div>
      <h1 className="text-3xl font-bold text-white">
        Welcome back, {user ? user.fullName : 'Student'}!
      </h1>
      <p className="text-gray-400 mt-2">Your learning journey starts here.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* --- THIS IS THE CHANGE --- */}
        <Link to="/quizzes" className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 transition-colors">
            <h3 className="text-xl font-bold text-white">Start New Quiz</h3>
        </Link>
        {/* --- END OF CHANGE --- */}

        {/* Other cards can be updated similarly later */}
        <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 cursor-not-allowed opacity-50">
            <h3 className="text-xl font-bold text-white">View Performance</h3>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 cursor-not-allowed opacity-50">
            <h3 className="text-xl font-bold text-white">Ask AI Tutor</h3>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg text-center hover:bg-gray-700 cursor-not-allowed opacity-50">
            <h3 className="text-xl font-bold text-white">Leaderboard</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
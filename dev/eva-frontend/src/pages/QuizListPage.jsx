// src/pages/QuizListPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('eva-token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

        const response = await axios.get('http://localhost:5000/api/quizzes', config);
        setQuizzes(response.data.data);
      } catch (err) {
        setError('Failed to load quizzes. Please try again later.');
        console.error('Fetch quizzes error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading quizzes...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Select a Quiz</h1>
      <div className="space-y-4">
        {quizzes.length === 0 ? (
          <p className="text-gray-400">No quizzes are available at the moment. Please check back later.</p>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-white">{quiz.title}</h2>
                <p className="text-gray-400">{quiz.subject} - {quiz.questions.length} Questions</p>
              </div>
              <Link
                to={`/quiz/${quiz._id}`} // This will link to the actual quiz later
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded"
              >
                Start Quiz
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizListPage;
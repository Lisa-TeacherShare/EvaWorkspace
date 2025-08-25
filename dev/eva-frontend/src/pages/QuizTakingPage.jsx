// src/pages/QuizTakingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizTakingPage = () => {
  // Get the quizId from the URL (e.g., /quiz/12345)
  const { quizId } = useParams();

  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem('eva-token');
        const config = {
          headers: { 'Authorization': `Bearer ${token}` }
        };

        const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`, config);
        setQuiz(response.data.data);
      } catch (err) {
        setError('Failed to load the quiz. It might not exist or an error occurred.');
        console.error('Fetch quiz error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]); // Re-run this effect if the quizId changes

  if (loading) {
    return <p className="text-white text-center">Loading Quiz...</p>;
  }

  if (error || !quiz) {
    return <p className="text-red-500 text-center">{error || 'Quiz not found.'}</p>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
      <p className="text-gray-400 mb-6">{quiz.subject}</p>

      <div className="bg-gray-800 p-6 rounded-lg">
        {/* Question Header */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </h2>
          <p className="text-lg mt-2">{currentQuestion.questionText}</p>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-md cursor-pointer hover:bg-cyan-600"
            >
              {option}
            </div>
          ))}
        </div>

        {/* We will add Navigation buttons and a Timer here in the next step */}
      </div>
    </div>
  );
};

export default QuizTakingPage; // <-- THIS IS THE LINE THAT FIXES THE ERROR
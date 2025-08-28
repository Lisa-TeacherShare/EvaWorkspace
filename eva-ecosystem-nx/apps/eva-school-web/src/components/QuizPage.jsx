import React, { useState, useEffect } from 'react';
import { getQuizzes } from '../api';
import { PlusCircle } from 'lucide-react';

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await getQuizzes();
        setQuizzes(response.data);
      } catch (err) {
        setError('Failed to fetch quizzes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold">Quiz Management</h2>
          <p className="text-gray-500">View, create, and manage your quizzes here.</p>
        </div>
        <button className="flex items-center bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <PlusCircle size={20} className="mr-2" />
          Create New Quiz
        </button>
      </div>

      {loading && <p>Loading quizzes...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="bg-white p-6 rounded-lg shadow">
          <ul>
            {quizzes.map(quiz => (
              <li key={quiz._id} className="border-b last:border-b-0 py-3 flex justify-between items-center">
                <div>
                    <p className="font-semibold text-lg">{quiz.title}</p>
                    <p className="text-sm text-gray-500">Subject: {quiz.subject} | {quiz.questions.length} Questions</p>
                </div>
                <div>
                    <button className="text-blue-500 hover:underline mr-4">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
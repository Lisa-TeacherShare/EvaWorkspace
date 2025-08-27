import React, { useState, useEffect } from 'react';
import { getQuestions, createQuiz } from '../api';
import { X } from 'lucide-react';

const CreateQuizModal = ({ onClose, onQuizCreated }) => {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [availableQuestions, setAvailableQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await getQuestions();
        setAvailableQuestions(res.data);
      } catch (err) {
        setError('Failed to load questions.');
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleQuestionToggle = (questionId) => {
    const newSelection = new Set(selectedQuestions);
    if (newSelection.has(questionId)) {
      newSelection.delete(questionId);
    } else {
      newSelection.add(questionId);
    }
    setSelectedQuestions(newSelection);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !subject || selectedQuestions.size === 0) {
      setError('Please fill in all fields and select at least one question.');
      return;
    }

    try {
      const quizData = {
        title,
        subject,
        questions: Array.from(selectedQuestions)
      };
      await createQuiz(quizData);
      onQuizCreated(); // This will tell the parent component to refresh its list
    } catch (err) {
      setError(err.message || 'Failed to create quiz.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Create New Quiz</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Quiz Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., Chapter 1 Review"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="e.g., Mathematics"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Questions</label>
            <div className="border rounded-lg p-3 h-64 overflow-y-auto">
              {loading ? <p>Loading questions...</p> : availableQuestions.map(q => (
                <div key={q._id} className="flex items-center my-2">
                  <input
                    type="checkbox"
                    id={q._id}
                    checked={selectedQuestions.has(q._id)}
                    onChange={() => handleQuestionToggle(q._id)}
                    className="mr-3 h-4 w-4"
                  />
                  <label htmlFor={q._id}>{q.text}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="mr-4 px-4 py-2 rounded-lg border">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create Quiz</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuizModal;
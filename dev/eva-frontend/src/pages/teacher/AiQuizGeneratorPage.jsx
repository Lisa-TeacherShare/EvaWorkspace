// src/pages/teacher/AiQuizGeneratorPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AiQuizGeneratorPage = () => {
  const [formData, setFormData] = useState({ text: '', subject: '', title: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('eva-token');
      const config = {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: 120000 // 2-minute timeout for AI
      };
      await axios.post('http://localhost:5000/api/ai/generate-quiz-from-text', formData, config);
      setSuccess('Quiz generated successfully! You will be redirected shortly.');

      setTimeout(() => navigate('/teacher/quizzes'), 2000);
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('The request timed out. The AI may be taking too long to respond.');
      } else {
        setError(err.response?.data?.error || 'Failed to generate quiz. Please check your input format.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">AI Quiz Generator</h1>
      <div className="bg-gray-800 p-6 rounded-lg">
        <p className="text-gray-400 mb-4">
          Paste your questions below. Each question should be on a new line. Mark the correct answer for each question with an asterisk (*).
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" name="title" value={formData.title} onChange={handleChange}
            placeholder="Quiz Title (e.g., WAEC 2024 Past Questions)"
            className="w-full bg-gray-700 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required
          />
          <input
            type="text" name="subject" value={formData.subject} onChange={handleChange}
            placeholder="Subject (e.g., Mathematics)"
            className="w-full bg-gray-700 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" required
          />
          <textarea
            name="text" value={formData.text} onChange={handleChange}
            placeholder={`Example:\n1. What is the capital of Nigeria?\nA) Lagos\nB) *Abuja\nC) Kano\n\n2. Who was the first president of Nigeria?\nA) *Nnamdi Azikiwe\nB) Tafawa Balewa...`}
            className="w-full bg-gray-700 rounded p-3 text-white h-64 focus:outline-none focus:ring-2 focus:ring-cyan-500" required
          />
          <button type="submit" disabled={loading} className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded transition-colors">
            {loading ? 'Generating...' : 'Generate Quiz with AI'}
          </button>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          {success && <p className="text-green-500 mt-2 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default AiQuizGeneratorPage; // <-- This is the line that fixes the error
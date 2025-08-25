// src/pages/teacher/QuestionManagementPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionManagementPage = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    subject: '',
    topic: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('eva-token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      const res = await axios.get('http://localhost:5000/api/questions', config);
      setQuestions(res.data.data);
    } catch (err) {
      setError('Failed to fetch questions.');
    } finally {
      setLoading(false);
    }
  };

  // Run fetchQuestions once when the component loads
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Handle changes in form inputs
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle changes for the four option inputs
  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  // Handle form submission to create a new question
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('eva-token');
      const config = { headers: { 'Authorization': `Bearer ${token}` } };
      await axios.post('http://localhost:5000/api/questions', formData, config);

      // Clear form and refetch questions to show the new one
      setFormData({ questionText: '', options: ['', '', '', ''], correctAnswer: '', subject: '', topic: '' });
      fetchQuestions();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create question.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Manage Questions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Create Question Form */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Add New Question</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea name="questionText" value={formData.questionText} onChange={handleChange} placeholder="Question Text" className="w-full bg-gray-700 rounded p-2 text-white" required />
            {formData.options.map((opt, index) => (
              <input key={index} type="text" value={opt} onChange={e => handleOptionChange(index, e.target.value)} placeholder={`Option ${index + 1}`} className="w-full bg-gray-700 rounded p-2 text-white" required />
            ))}
            <input type="text" name="correctAnswer" value={formData.correctAnswer} onChange={handleChange} placeholder="Correct Answer (must match one option exactly)" className="w-full bg-gray-700 rounded p-2 text-white" required />
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject (e.g., Mathematics)" className="w-full bg-gray-700 rounded p-2 text-white" required />
            <input type="text" name="topic" value={formData.topic} onChange={handleChange} placeholder="Topic (e.g., Algebra)" className="w-full bg-gray-700 rounded p-2 text-white" />
            <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded">Add Question</button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </form>
        </div>

        {/* List of Existing Questions */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-white mb-4">Your Questions</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {loading ? <p className="text-gray-400">Loading...</p> : questions.map(q => (
              <div key={q._id} className="bg-gray-700 p-3 rounded">
                <p className="text-white">{q.questionText}</p>
                <p className="text-xs text-gray-400">{q.subject} - {q.topic}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionManagementPage;
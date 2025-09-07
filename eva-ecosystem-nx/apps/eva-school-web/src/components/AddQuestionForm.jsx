// Filename: apps/eva-school-web/src/components/AddQuestionForm.jsx

import React, { useState } from 'react';
import { createQuestion } from '../api/questionService'; // Import our new service

export const AddQuestionForm = ({ onSuccess }) => {
  const [questionText, setQuestionText] = useState('');
  const [subject, setSubject] = useState('');
  const [options, setOptions] = useState([
    { text: '', isCorrect: true },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
    { text: '', isCorrect: false },
  ]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const handleCorrectOptionChange = (index) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }));
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const questionData = {
        questionText,
        subject,
        educationLevel: 'Senior', // These would be dropdowns in the final version
        topic: 'General',
        difficulty: 'medium',
        options,
      };

      await createQuestion(questionData);
      alert('Question created successfully!');
      if (onSuccess) onSuccess(); // Callback to close modal or refresh list
    } catch (err) {
      setError('Failed to create question. You may not have the required role (Teacher/Admin).');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">Add New Question</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div>
        <label className="block font-medium">Question Text</label>
        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      
      <div>
        <label className="block font-medium">Subject</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Options</label>
        {options.map((opt, index) => (
          <div key={index} className="flex items-center space-x-2 my-2">
            <input
              type="radio"
              name="correctOption"
              checked={opt.isCorrect}
              onChange={() => handleCorrectOptionChange(index)}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <input
              type="text"
              value={opt.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Option ${index + 1}`}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}
      </div>

      <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400">
        {isLoading ? 'Saving...' : 'Save Question'}
      </button>
    </form>
  );
};
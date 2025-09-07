// In your apps/eva-school-web/src/components/QuizPage.jsx

import React, { useState } from 'react';
import { AddQuestionForm } from './AddQuestionForm';
// ... other imports from your existing file

const QuizPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ... your existing component logic from QuizPage.jsx

  return (
    <div>
      {/* Your existing page content */}
      <div className="mt-8">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Question
        </button>
      </div>

      {/* Modal to display the form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-100 p-4 rounded-lg w-full max-w-lg">
            <AddQuestionForm onSuccess={() => setIsModalOpen(false)} />
            <button onClick={() => setIsModalOpen(false)} className="mt-4 w-full text-center text-gray-600 hover:text-gray-800">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
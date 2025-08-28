import { auth } from './firebase';

const API_BASE_URL = 'http://localhost:5000/api';

const apiRequest = async (endpoint, options = {}) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No authenticated user found.');
  }

  const token = await user.getIdToken();

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `API request failed with status ${response.status}`);
  }

  return response.json();
};

// --- API Functions ---

export const getSchools = () => {
  return apiRequest('/schools');
};

export const getQuizzes = () => {
  return apiRequest('/quizzes');
};

export const getQuestions = () => {
  return apiRequest('/questions');
};

export const createQuiz = (data) => {
  return apiRequest('/quizzes', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// New function to get all users
export const getUsers = () => {
  return apiRequest('/auth/users');
};
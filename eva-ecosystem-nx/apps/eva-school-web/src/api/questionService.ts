// Filename: apps/eva-school-web/src/api/questionService.ts

import axios from 'axios';
import { auth } from '../firebase'; // You already have this file
import { Question } from '@eva-ecosystem-nx/data-access';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// This "interceptor" automatically adds the user's login token to every API call.
axiosInstance.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Define the data needed to create a question, using our shared interface
type CreateQuestionData = Omit<Question, '_id' | 'createdAt' | 'createdBy'>;

export const createQuestion = async (questionData: CreateQuestionData): Promise<Question> => {
  try {
    const response = await axiosInstance.post('/questions', questionData);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
};
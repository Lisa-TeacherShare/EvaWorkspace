// eva-backend/controllers/ai.js
const axios = require('axios');
const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const Submission = require('../models/Submission');

// @desc    Generate a quiz from a block of text using AI
// @route   POST /api/ai/generate-quiz-from-text
// @access  Private (Teacher/Admin)
exports.generateQuizFromText = async (req, res, next) => {
  const { text, subject, title } = req.body;
  const teacherId = req.user.id;

  if (!text || !subject || !title) {
    return res.status(400).json({ success: false, error: 'Please provide text, a subject, and a title.' });
  }

  const prompt = `You are an expert at creating educational materials. Based on the following text, which contains questions, options, and correct answers marked with an asterisk (*), perform the following tasks: 1. For each question, identify the question text, all the options, and the single correct answer. 2. For each question, generate an array of 1 to 3 relevant educational topics in lowercase (e.g., ["algebra", "linear equations"]). 3. Format the entire output as a single, minified JSON array. Do not include any text or formatting outside of the JSON array. The JSON structure for each question object in the array must be as follows: { "questionText": "The question itself...", "options": ["Option A", "Option B", "Option C", "Option D"], "correctAnswer": "The correct option text...", "subject": "${subject}", "topic": ["topic1", "topic2"] }. Here is the text to parse: --- ${text} ---`;

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }]
    }, {
      headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
    });
    
    let rawResponseText = response.data.choices[0].message.content;
    const startIndex = rawResponseText.indexOf('[');
    const endIndex = rawResponseText.lastIndexOf(']');
    if (startIndex === -1 || endIndex === -1) {
      throw new Error("AI did not return a valid JSON array.");
    }
    const jsonText = rawResponseText.substring(startIndex, endIndex + 1);
    const parsedQuestions = JSON.parse(jsonText);

    const questionsToCreate = parsedQuestions.map(q => {
      const correctAnswerIndex = q.options.findIndex(opt => opt === q.correctAnswer);
      if (correctAnswerIndex === -1) {
        throw new Error(`Correct answer "${q.correctAnswer}" not found in options for question "${q.questionText}"`);
      }
      return {
        ...q,
        correctAnswerIndex: correctAnswerIndex,
        examType: 'School Exam',
        createdBy: teacherId
      };
    });

    const questionDocs = await Question.insertMany(questionsToCreate);
    const questionIds = questionDocs.map(q => q._id);
    
    const newQuiz = await Quiz.create({
        title: title,
        subject: subject,
        questions: questionIds,
        createdBy: teacherId
    });

    res.status(201).json({
      success: true,
      message: 'Quiz generated and saved successfully!',
      data: newQuiz
    });

  } catch (err) {
    console.error('--- AI QUIZ GENERATION ERROR ---');
    console.error(err.response ? err.response.data : err.message);
    res.status(500).json({ success: false, error: 'Failed to process AI response. Please check your text format.' });
  }
};


// --- Your other AI functions ---
exports.askQuestion = async (req, res, next) => {
  res.status(501).json({ success: false, error: 'Ask Question feature not yet implemented with OpenRouter.' });
};
exports.generatePersonalizedQuiz = async (req, res, next) => {
  res.status(501).json({ success: false, error: 'Personalized Quiz feature not yet implemented with OpenRouter.' });
};
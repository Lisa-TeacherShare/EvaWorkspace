const { GoogleGenerativeAI } = require("@google/generative-ai");
const Submission = require('../models/Submission');
const Question = require('../models/Question');

// Initialize the Google AI client with your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// @desc    Get an answer from the AI Homework Helper
// @route   POST /api/ai/ask
// @access  Private (Premium users)
exports.askQuestion = async (req, res, next) => {
  try {
    const { questionText } = req.body;

    if (!questionText) {
      return res.status(400).json({ success: false, error: 'Please provide a question' });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create a carefully crafted prompt
    const prompt = `You are an expert tutor for Nigerian secondary school students.
    A student has asked the following question: "${questionText}"
    
    Provide a clear, step-by-step solution. First, give the final answer, then explain the steps to get there.
    Format your response as follows:
    ANSWER: [Your final answer here]
    STEPS: [Your step-by-step explanation here]`;

    // Send the prompt to the AI and get the result
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the AI's response to separate the answer and steps
    const answerMatch = text.match(/ANSWER: (.*)/);
    const stepsMatch = text.match(/STEPS: ([\s\S]*)/);

    const finalAnswer = answerMatch ? answerMatch[1].trim() : "Could not determine the final answer.";
    const finalSteps = stepsMatch ? stepsMatch[1].trim() : text;

    res.status(200).json({
      success: true,
      data: {
        answer: finalAnswer,
        steps: finalSteps,
      },
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};


// @desc    Generate a personalized quiz based on user's weak topics
// @route   POST /api/ai/personalized-quiz
// @access  Private (Premium users)
exports.generatePersonalizedQuiz = async (req, res, next) => {
    try {
        const studentId = req.user.id;

        // Step 1: Find the user's most recent submissions
        const submissions = await Submission.find({ student: studentId })
            .sort({ submittedAt: -1 })
            .limit(5)
            .populate({
                path: 'answers.questionId',
                select: 'topic correctAnswerIndex' 
            });

        if (submissions.length === 0) {
            return res.status(400).json({ success: false, error: 'No recent submissions found to analyze.' });
        }

        // Step 2: Identify the topics where the user answered incorrectly
        const weakTopics = new Map();
        submissions.forEach(sub => {
            sub.answers.forEach(ans => {
                if (ans.questionId && ans.selectedAnswerIndex !== ans.questionId.correctAnswerIndex) {
                    const topic = ans.questionId.topic;
                    weakTopics.set(topic, (weakTopics.get(topic) || 0) + 1);
                }
            });
        });

        if (weakTopics.size === 0) {
            return res.status(200).json({ success: true, message: "No weak topics found! Great job!", data: [] });
        }

        // Step 3: Find the top 3 weakest topics
        const sortedWeakTopics = [...weakTopics.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3);
        const topicsToImprove = sortedWeakTopics.map(t => t[0]).join(', ');

        // Step 4: Ask the AI to generate new questions on these topics
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Generate 5 new multiple-choice exam questions for a Nigerian secondary school student.
        The questions must be on the following topics: ${topicsToImprove}.
        Each question should have 4 options.
        Format the output as a valid JSON array of objects. Each object must have these exact keys: "questionText", "options" (an array of 4 strings), and "correctAnswer" (the text of the correct option). Do not include any other text or formatting.`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().replace(/```json|```/g, '').trim();
        
        const newQuestions = JSON.parse(text);

        res.status(200).json({
            success: true,
            message: `Personalized quiz generated for topics: ${topicsToImprove}`,
            data: newQuestions
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: 'Server Error while generating quiz' });
    }
};
// src/controllers/quizController.js
const Quiz = require("../models/quizModel");

// Get all quizzes
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

// Get quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: "Error fetching quiz" });
  }
};

// Submit quiz answers and calculate score
// src/controllers/quizController.js
exports.submitQuiz = async (req, res) => {
  const { quizId, answers } = req.body;

  try {
    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) {
        score += 1;
      }
    });

    // Return the quiz, score, and user's answers in the response
    res.status(200).json({
      score,
      totalQuestions: quiz.questions.length,
      quiz, // Full quiz object
      userAnswers: answers, // User's answers array
    });
  } catch (error) {
    res.status(500).json({ message: "Error submitting quiz" });
  }
};

// src/routes/quizRoutes.js
const express = require("express");
const {
  getQuizzes,
  getQuizById,
  submitQuiz,
} = require("../controllers/quizController");

const router = express.Router();

router.get("/quizzes", getQuizzes);
router.get("/quizzes/:id", getQuizById);
router.post("/quizzes/submit", submitQuiz);

module.exports = router;

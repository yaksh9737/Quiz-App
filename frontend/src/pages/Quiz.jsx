// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa"; // Import icons

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    api
      .get(`/quizzes/${id}`)
      .then((response) => {
        setQuiz(response.data);
      })
      .catch((error) => {
        console.error("Error fetching quiz:", error);
      });
  }, [id]);

  const handleAnswerChange = (index, answer) => {
    setAnswers({ ...answers, [index]: answer });
  };

  const handleSubmit = () => {
    const quizData = {
      quizId: id,
      answers: Object.values(answers),
    };

    api
      .post("/quizzes/submit", quizData)
      .then((response) => {
        window.location.href = `/score/${response.data.score}/${response.data.totalQuestions}/${id}`;
      })
      .catch((error) => {
        console.error("Error submitting quiz:", error);
      });
  };

  if (!quiz) return <div className="text-white text-center mt-20 text-xl">Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 flex justify-center items-center px-6">
      <div className="flex space-x-10 w-full max-w-screen-lg items-start">
        {/* Question Panel */}
        <div className="flex-grow bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-xl font-bold text-gray-100 mb-6 flex items-center">
            <FaQuestionCircle className="mr-3 text-blue-500" />
            {currentQuestion + 1}) {quiz.questions[currentQuestion].question}
          </h1>
          <div className="mb-6 space-y-3">
            {quiz.questions[currentQuestion].choices.map((choice, index) => (
              <label
                key={index}
                className="block border border-gray-700 p-4 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion}`}
                  value={choice}
                  checked={answers[currentQuestion] === choice}
                  onChange={() => handleAnswerChange(currentQuestion, choice)}
                  className="mr-3 text-blue-600"
                />
                <span className="text-gray-200">{choice}</span>
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            {currentQuestion > 0 && (
              <button
                className="flex items-center bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
              >
                <FaArrowLeft className="mr-2" /> Previous
              </button>
            )}

            {currentQuestion < quiz.questions.length - 1 ? (
              <button
                className="flex items-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors"
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors"
                onClick={handleSubmit}
              >
                Submit Quiz
              </button>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-200">Answered Status</h2>
            <div className="flex items-center justify-between mt-4">
              <div className="text-center">
                <div className="bg-green-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {Object.keys(answers).length}
                </div>
                <p className="text-xs mt-1 text-gray-400">Answered</p>
              </div>
              <div className="text-center">
                <div className="bg-red-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {quiz.questions.length - Object.keys(answers).length}
                </div>
                <p className="text-xs mt-1 text-gray-400">Not Answered</p>
              </div>
              <div className="text-center">
                <div className="bg-gray-600 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center">
                  {quiz.questions.length}
                </div>
                <p className="text-xs mt-1 text-gray-400">Total</p>
              </div>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-200 mb-2">Questions</h2>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                className={`h-10 w-10 font-bold rounded-lg ${
                  currentQuestion === index
                    ? "bg-blue-600 text-white"
                    : answers[index]
                    ? "bg-green-500 text-white"
                    : "bg-gray-700 text-gray-300"
                } hover:bg-blue-500 transition-colors`}
                onClick={() => setCurrentQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-500 transition-colors w-full mt-4"
            onClick={() => navigate("/")}
          >
            <FaHome className="mr-2" /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;

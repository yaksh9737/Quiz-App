// src/components/ScoreSummary.jsx
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaHome } from "react-icons/fa"; // Import icons
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { motion } from "framer-motion"; // For animations

const ScoreSummary = () => {
  const { score, totalQuestions, quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/quizzes/${quizId}`)
      .then((response) => {
        setQuiz(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quiz data:", error);
        setError("Failed to load quiz data. Please try again later.");
        setLoading(false);
      });
  }, [quizId]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="text-white text-lg">Loading...</span>
        </motion.div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <FaTimesCircle className="text-3xl mr-2" />
            <h2 className="text-2xl font-bold">Error</h2>
          </div>
          <p>{error}</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 flex items-center bg-white text-red-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaHome className="mr-2" /> Go to Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-3xl w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6 text-center flex justify-center items-center">
          <FaCheckCircle className="text-green-500 mr-2 animate-pulse" />
          Quiz Complete!
        </h1>
        <div className="bg-gray-700 rounded-lg p-6 mb-6">
          <p className="text-xl mb-4">
            Your Score:{" "}
            <span className="font-bold text-green-400">
              {score}
            </span>{" "}
            / {totalQuestions}
          </p>

          <div className="mt-4">
            <h2 className="text-2xl font-semibold mb-4">Exam Results</h2>
            <ul className="space-y-4">
              {quiz.questions.map((question, index) => (
                <motion.li
                  key={index}
                  className="p-4 border-l-4 border-green-500 bg-gray-600 rounded-lg"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-semibold mb-2">
                    {index + 1}. {question.question}
                  </p>
                  <p className="flex items-center text-green-400">
                    <FaCheckCircle className="mr-2" /> Correct Answer:{" "}
                    {question.correctAnswer}
                  </p>
                  {question.userAnswer !== question.correctAnswer && (
                    <p className="flex items-center text-red-400 mt-2">
                      <FaTimesCircle className="mr-2" /> Your Answer:{" "}
                      {question.userAnswer || "Not Answered"}
                    </p>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
          >
            <FaHome className="mr-2" /> Take Another Quiz
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ScoreSummary;

// src/components/QuizList.jsx
import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaArrowRight,
  FaSearch,
  FaSpinner,
  FaExclamationTriangle,
  FaCertificate,
  FaTimes,
} from "react-icons/fa";
import api from "../api/api"; // Import the centralized API
import { motion } from "framer-motion"; // For animations
import Modal from "react-modal"; // For modals
import Tilt from "react-parallax-tilt"; // For tilt effects
import Particles from "react-tsparticles"; // For background particles

// Configure React Modal
Modal.setAppElement("#root");

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    // Fetch quizzes from the API
    api
      .get("/quizzes")
      .then((response) => {
        setQuizzes(response.data);
        setFilteredQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching quizzes:", error);
        setError("Failed to load quizzes. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Handle search input changes
  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterQuizzes(term);
  };

  // Filter quizzes based on search term
  const filterQuizzes = (term) => {
    let filtered = quizzes;

    if (term) {
      filtered = filtered.filter((quiz) =>
        quiz.title.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredQuizzes(filtered);
  };

  // Modal styles
  const customModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      background: "rgba(0, 0, 0, 0.85)",
      color: "#fff",
      border: "none",
      borderRadius: "10px",
      padding: "20px",
      maxWidth: "600px",
      width: "90%",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
  };

  // Particle options for background
  const particlesOptions = {
    background: {
      color: {
        value: "#1a202c", // Dark background
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: {
          default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.2,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 3 },
      },
    },
    detectRetina: true,
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-gray-100 p-8 overflow-hidden">
      {/* Animated Background Particles */}
      <Particles className="absolute inset-0 z-0" options={particlesOptions} />

      <div className="relative z-10 container mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-8 text-center flex justify-center items-center">
          <FaBook className="inline-block mr-3 text-blue-400 animate-bounce" />
          Available Quizzes
        </h1>

        {/* Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search quizzes..."
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-800 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              aria-label="Search quizzes"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center">
            <FaSpinner
              className="animate-spin text-blue-400 text-6xl"
              aria-label="Loading"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="flex justify-center items-center bg-red-600 text-white p-4 rounded-lg mb-6">
            <FaExclamationTriangle className="mr-2" />
            <span>{error}</span>
          </div>
        )}

        {/* Quiz Grid */}
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            {filteredQuizzes.length > 0 ? (
              filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz._id}
                  className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Tilt
                    tiltMaxAngleX={10}
                    tiltMaxAngleY={10}
                    glareEnable={false}
                    scale={1.02}
                    transitionSpeed={250}
                  >
                    <div
                      className="h-full flex flex-col"
                      onClick={() => setSelectedQuiz(quiz)}
                      role="button"
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") setSelectedQuiz(quiz);
                      }}
                    >
                      {/* Quiz Details */}
                      <div className="p-4 flex flex-col flex-grow">
                        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
                        <p className="text-gray-400 flex-grow">{quiz.description}</p>
                      </div>

                      {/* Take Quiz Button */}
                      <div className="p-4">
                        <motion.a
                          href={`/quiz/${quiz._id}`}
                          className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors duration-300 relative"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Take quiz: ${quiz.title}`}
                        >
                          Take Quiz <FaArrowRight className="ml-2 animate-bounce" />
                        </motion.a>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                No quizzes found matching "{searchTerm}".
              </div>
            )}
          </motion.div>
        )}

        {/* Quiz Detail Modal */}
        {selectedQuiz && (
          <Modal
            isOpen={!!selectedQuiz}
            onRequestClose={() => setSelectedQuiz(null)}
            style={customModalStyles}
            contentLabel="Quiz Details"
            closeTimeoutMS={300}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold">{selectedQuiz.title}</h2>
              <button
                onClick={() => setSelectedQuiz(null)}
                className="text-gray-300 hover:text-white focus:outline-none"
                aria-label="Close Modal"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <p className="text-gray-300 mb-4">{selectedQuiz.description}</p>
            <div className="mt-6 flex justify-end">
              <motion.a
                href={`/quiz/${selectedQuiz._id}`}
                className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Start quiz: ${selectedQuiz.title}`}
              >
                Start Quiz <FaArrowRight className="ml-2" />
              </motion.a>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default QuizList;

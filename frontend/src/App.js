import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizList from "./pages/QuizList";
import Quiz from "./pages/Quiz";
import ScoreSummary from "./pages/ScoreSummary";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<QuizList />} />
          <Route path="/quiz/:id" element={<Quiz />} />
          {/* Update route to pass quizId */}
          <Route
            path="/score/:score/:totalQuestions/:quizId"
            element={<ScoreSummary />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

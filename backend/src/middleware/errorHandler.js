// src/middleware/errorHandler.js
module.exports = (err, req, res, next) => {
  res.status(500).json({
    message: err.message || "An unexpected error occurred",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

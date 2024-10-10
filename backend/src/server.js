const express = require("express");
const dbConnection = require("./config/db");
const Config = require("./config");
const cors = require("cors");
const path = require("path");
const quizRoutes = require("./routes/quizRoutes");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const PORT = Config.PORT || 5000;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(errorHandler);

// dbConnection
dbConnection();

// Routes
app.use("/api", quizRoutes);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err, "server is not Connected");
  }
  console.log(`listening on port : http://localhost:${PORT}`);
});

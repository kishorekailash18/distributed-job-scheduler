require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const pool = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");

// Import Worker
const startWorker = require("./worker/jobWorker");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

// Database Connection Test
console.log("Before DB Test");

pool.query("SELECT NOW()")
  .then((result) => {
    console.log("✅ PostgreSQL Connected");
    console.log(result.rows);
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });

console.log("After DB Test");

// Home Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Distributed Job Scheduler API 🚀",
  });
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // Start Job Worker
  startWorker();
});
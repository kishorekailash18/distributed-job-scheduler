const pool = require("../config/db");

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const { title, description } = req.body;

    const created_by = req.user.id;

    const newJob = await pool.query(
      `INSERT INTO jobs (title, description, created_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, created_by]
    );

    res.status(201).json({
      success: true,
      job: newJob.rows[0],
    });
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET ALL JOBS
const getJobs = async (req, res) => {
  try {
    const jobs = await pool.query(
      "SELECT * FROM jobs WHERE created_by = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json({
      success: true,
      jobs: jobs.rows,
    });
  } catch (err) {
    console.error("GET JOBS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// GET SINGLE JOB
const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await pool.query(
      "SELECT * FROM jobs WHERE id = $1 AND created_by = $2",
      [id, req.user.id]
    );

    if (job.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      job: job.rows[0],
    });
  } catch (err) {
    console.error("GET JOB ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const updatedJob = await pool.query(
      `UPDATE jobs
       SET title=$1, description=$2, status=$3
       WHERE id=$4 AND created_by=$5
       RETURNING *`,
      [title, description, status, id, req.user.id]
    );

    if (updatedJob.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      job: updatedJob.rows[0],
    });
  } catch (err) {
    console.error("UPDATE JOB ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedJob = await pool.query(
      "DELETE FROM jobs WHERE id=$1 AND created_by=$2 RETURNING *",
      [id, req.user.id]
    );

    if (deletedJob.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
};
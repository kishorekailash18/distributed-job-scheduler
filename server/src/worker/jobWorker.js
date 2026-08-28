const pool = require("../config/db");

const startWorker = () => {
  console.log("🚀 Job Worker Started...");

  setInterval(async () => {
    try {
      const jobs = await pool.query(
        `SELECT * FROM jobs
         WHERE status = 'pending'
         AND (scheduled_at IS NULL OR scheduled_at <= NOW())
         ORDER BY created_at ASC`
      );

      for (const job of jobs.rows) {
        console.log(`⚡ Processing Job #${job.id}`);

        await pool.query(
          "UPDATE jobs SET status = 'processing' WHERE id = $1",
          [job.id]
        );

        await new Promise((resolve) => setTimeout(resolve, 2000));

        await pool.query(
          "UPDATE jobs SET status = 'completed' WHERE id = $1",
          [job.id]
        );

        console.log(`✅ Job #${job.id} Completed`);
      }
    } catch (err) {
      console.error("Worker Error:", err);
    }
  }, 5000);
};

module.exports = startWorker;
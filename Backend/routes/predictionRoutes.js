const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/save", async (req, res) => {
  const { name, eye, prediction_class, probabilities } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO predictions (name, eye, prediction_class, probabilities, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [name, eye, prediction_class, JSON.stringify(probabilities)]
    );
    res.json({ status: "success", data: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save prediction" });
  }
});

module.exports = router;

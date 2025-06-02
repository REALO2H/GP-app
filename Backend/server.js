const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
 "mongodb+srv://Omar:12345@cluster0.3viab.mongodb.net/GP_DB?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
  ).then(() => {
  console.log("Connected to MongoDB Atlas");
  }).catch((err) => { 
  console.error("MongoDB connection error:", err);
  });
// Updated schema for patient-based prediction
const predictionSchema = new mongoose.Schema({
  patient_name: String,
  eye: { type: String, enum: ["left", "right"] },
  prediction_label: Number,
  confidence_score: Number,
  timestamp: { type: Date, default: Date.now }
});

const Prediction = mongoose.model("Prediction", predictionSchema);

// POST route
app.post("/save-prediction", async (req, res) => {
  const { patient_name, eye, prediction_label, confidence_score } = req.body;

  if (!patient_name || !eye || prediction_label === undefined || confidence_score === undefined) {
    return res.status(400).json({ message: "❌ Missing required fields" });
  }

  try {
    const newPrediction = new Prediction({
      patient_name,
      eye,
      prediction_label,
      confidence_score
    });

    await newPrediction.save();
    res.status(200).json({ message: "✅ Prediction saved for patient" });
  } catch (error) {
    console.error("❌ Error saving to MongoDB:", error);
    res.status(500).json({ message: "❌ Failed to save prediction" });
  }
});

app.listen(5001, () => {
  console.log("🚀 Express + MongoDB server running on http://localhost:5001");
});

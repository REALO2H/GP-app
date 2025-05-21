// src/components/ImageUpload.jsx
import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose an image first");

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Prediction failed. See console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Diabetic Retinopathy Classifier</h2>

      <input type="file" accept="image/*" onChange={handleChange} />
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Classifying..." : "Classify Image"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <h4>Predicted Class: {result.class}</h4>
          <ul>
            {result.probabilities.map((p, i) => (
              <li key={i}>Class {i}: {(p * 100).toFixed(2)}%</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;

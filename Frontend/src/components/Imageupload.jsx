import React, { useState } from "react";
import axios from "axios";
import './ImageUpload.css';


const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const imageFile = e.target.files[0];
    setFile(imageFile);
    setPreviewURL(URL.createObjectURL(imageFile));  // <--- Preview!
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please choose an image first");


    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", patientName);
    formData.append("eye", eyeSide);
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Prediction failed. Check console.");
    } finally {
      setLoading(false);
    }
  };


 


  const [patientName, setPatientName] = useState('');
  const [eyeSide, setEyeSide] = useState('right');

  return (
<div className="container">
  <h2>🧠 Diabetic Retinopathy Classifier</h2>

  <input
    type="text"
    placeholder="Enter patient name"
    value={patientName}
    onChange={(e) => setPatientName(e.target.value)}
    style={{ padding: "8px", marginBottom: "10px", width: "100%" }}
  />

  <br />

  <label>
    <input
      type="radio"
      name="eyeSide"
      value="right"
      checked={eyeSide === "right"}
      onChange={(e) => setEyeSide(e.target.value)}
    />
  Right Eye
  </label>

  <label style={{ marginLeft: "20px" }}>
    <input
    type="radio"
    name="eyeSide"
    value="left"
    checked={eyeSide === "left"}
    onChange={(e) => setEyeSide(e.target.value)}
    />
  Left Eye
  </label>
  <br /><br />
    <input type="file" accept="image/*" onChange={handleChange} />
    <br /><br />

    {previewURL && (
      <img src={previewURL} alt="Preview" className="preview" />
    )}

    <br />
    <button onClick={handleUpload} disabled={loading}>
      {loading ? "🔄 Classifying..." : "📤 Upload & Predict"}
    </button>

    {result && (
    <div className="result">
      <h3>🧾 Result</h3>
      <p><strong>Predicted Class:</strong> {result.class}</p>
      <h4>Probabilities:</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {result.probabilities.map((p, i) => (
          <li key={i}>
            Class {i}: {(p * 100).toFixed(2)}%
            <div className="bar" style={{ width: `${p * 100}%` }}></div>
          </li>
        ))}
      </ul>
    </div>
    )}
  </div>

    );
  };

export default ImageUpload;

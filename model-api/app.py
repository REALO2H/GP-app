from flask import Flask, request, jsonify
from model.inference import load_model, predict_image

import sys
import io
from flask_cors import CORS

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

app = Flask(__name__)
CORS(app) 
model = load_model()

@app.route('/')
def home():
    return " Diabetic Retinopathy API Running!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    name = request.form.get('name')
    eye = request.form.get('eye')

    prediction = predict_image(file, model)
    predicted_class = prediction["class"]
    probabilities = prediction["probabilities"]
    confidence = max(probabilities)

    # Send to Express
    save_prediction_to_express(name, eye, predicted_class, confidence)

    # Return all info to React
    return jsonify({
        "class": predicted_class,
        "confidence": confidence,
        "probabilities": probabilities,
        "name": name,
        "eye": eye
    })



import requests

def save_prediction_to_express(patient_name, eye, prediction_label, confidence_score):
    url = "http://localhost:5001/save-prediction"
    payload = {
        "patient_name": patient_name,
        "eye": eye,
        "prediction_label": int(prediction_label),
        "confidence_score": float(confidence_score)
    }

    try:
        response = requests.post(url, json=payload)
        print("✅ Sent to Express:", response.json())
    except Exception as e:
        print("❌ Failed to send to Express:", str(e))


if __name__ == '__main__':
    app.run(debug=False, port=5000)

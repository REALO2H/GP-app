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
    return "👁️ Diabetic Retinopathy API Running!"

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400

    file = request.files['image']
    name = request.form.get('name')
    eye = request.form.get('eye')

    prediction = predict_image(file, model)

    return jsonify({
        "class": prediction["class"],
        "probabilities": prediction["probabilities"],
        "name": name,
        "eye": eye
    })

if __name__ == '__main__':
    app.run(debug=False, port=5001)

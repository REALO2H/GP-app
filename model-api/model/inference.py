import numpy as np
from tensorflow.keras.models import load_model as keras_load_model
from PIL import Image
import io

import os
path = "D:\gp_app\model-api\model\\resnet_clean.h5"


def load_model():
    model = keras_load_model(path, compile=False)
    return model

def preprocess_image(file):
    img = Image.open(file).convert('RGB')
    img = img.resize((224, 224))  # adjust to your model's input size
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

def predict_image(file, model):
    img_array = preprocess_image(file)
    preds = model.predict(img_array)[0]
    predicted_class = int(np.argmax(preds))
    return {
        "class": predicted_class,
        "probabilities": preds.tolist()
    }

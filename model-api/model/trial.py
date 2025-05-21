import numpy as np
# from tensorflow.keras.models import load_model as keras_load_model
from PIL import Image
import io
from tensorflow.keras.preprocessing import image
import sys
sys.stdout.reconfigure(encoding='utf-8')


# model = keras_load_model("D:\gp_app\model-api\model\\resnet_6_stripped.h5", compile=False)
# print("it's running")




# from tensorflow.keras.models import load_model

# # Make sure path is correct
# model = load_model("D:/gp_app/model-api/model/resnet_trail_6.h5", compile=False)
# print("Model loaded successfully.")

# img_path = "D:/gp_app/model-api/test-images/test4.jpg"
# img = image.load_img(img_path, target_size=(224, 224))  # Change to match your model input
# img_array = image.img_to_array(img)
# img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
# img_array = img_array / 255.0  # Normalize if your model was trained on normalized data


# class_names = ["No DR", "Mild", "Moderate", "Severe", "Proliferative"]

# import numpy as np

# # Predict
# prediction = model.predict(img_array)

# # Flatten the prediction array
# probabilities = prediction[0]

# # Show each class probability nicely
# print("\n📊 Class Probabilities:")
# for i, prob in enumerate(probabilities):
#     print(f"{class_names[i]:15}: {prob*100:.2f}%")

# # Show most confident prediction
# predicted_class = int(np.argmax(probabilities))
# print(f"\n✅ Predicted Class: {predicted_class} → {class_names[predicted_class]}")


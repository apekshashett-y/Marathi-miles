from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

print("🚀 Starting Flask Emotion Detection Server...")

# Check if model file exists
if not os.path.exists("emotion_detection_model.h5"):
    print("❌ ERROR: emotion_detection_model.h5 not found!")
    print("Please place your trained model in the same directory as app.py")
else:
    print("✅ Model file found")

# Check if cascade file exists
if not os.path.exists("haarcascade_frontalface_default.xml"):
    print("❌ ERROR: haarcascade_frontalface_default.xml not found!")
    print("Download from: https://github.com/opencv/opencv/tree/master/data/haarcascades")
else:
    print("✅ Cascade file found")

# Build model architecture (MUST match your training architecture)
try:
    model = Sequential([
        Conv2D(32, (3,3), activation='relu', input_shape=(48,48,1)),
        MaxPooling2D(2,2),
        
        Conv2D(64, (3,3), activation='relu'),
        MaxPooling2D(2,2),
        
        Conv2D(128, (3,3), activation='relu'),
        MaxPooling2D(2,2),
        
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(7, activation='softmax')
    ])
    
    # Load trained weights
    model.load_weights("emotion_detection_model.h5")
    print("✅ Model loaded successfully")
    
except Exception as e:
    print(f"❌ Error loading model: {e}")
    model = None

# Emotion labels (MUST match your training labels order)
emotion_labels = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

# Load face cascade
try:
    face_cascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
    if face_cascade.empty():
        print("❌ Failed to load cascade classifier")
        face_cascade = None
    else:
        print("✅ Face cascade loaded")
except Exception as e:
    print(f"❌ Error loading face cascade: {e}")
    face_cascade = None

@app.route("/")
def index():
    return jsonify({
        "status": "Flask Emotion Detection Server is running",
        "model_loaded": model is not None,
        "cascade_loaded": face_cascade is not None,
        "endpoint": "/predict"
    })

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model": "loaded" if model else "not loaded",
        "cascade": "loaded" if face_cascade else "not loaded"
    })

@app.route("/predict", methods=["POST", "OPTIONS"])
def predict():
    # Handle CORS preflight
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200
    
    try:
        # Check if model is loaded
        if model is None:
            return jsonify({
                "error": "Model not loaded",
                "emotion": "Error"
            }), 500
        
        # Get image from request
        data = request.json
        if not data or 'image' not in data:
            return jsonify({
                "error": "No image data provided",
                "emotion": "Error"
            }), 400
        
        # Decode base64 image
        img_str = data['image']
        if ',' in img_str:
            img_str = img_str.split(',')[1]
        
        img_data = base64.b64decode(img_str)
        np_img = np.frombuffer(img_data, np.uint8)
        frame = cv2.imdecode(np_img, cv2.IMREAD_COLOR)
        
        if frame is None:
            return jsonify({
                "error": "Failed to decode image",
                "emotion": "Error"
            }), 400
        
        # Convert to grayscale
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        if face_cascade is None:
            return jsonify({
                "error": "Face cascade not loaded",
                "emotion": "Error"
            }), 500
        
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)
        
        # No face detected
        if len(faces) == 0:
            return jsonify({"emotion": "No Face"})
        
        # Get first face
        x, y, w, h = faces[0]
        
        # Add padding and extract ROI
        pad = int(0.1 * w)
        roi = gray[max(0, y+pad):min(gray.shape[0], y+h-pad), 
                   max(0, x+pad):min(gray.shape[1], x+w-pad)]
        
        # Resize to 48x48 (model input size)
        roi = cv2.resize(roi, (48, 48))
        
        # Normalize
        roi = roi / 255.0
        
        # Reshape for model input
        roi = roi.reshape(1, 48, 48, 1)
        
        # Predict emotion
        pred = model.predict(roi, verbose=0)
        emotion_idx = np.argmax(pred)
        emotion = emotion_labels[emotion_idx]
        confidence = float(pred[0][emotion_idx])
        
        print(f"🎭 Detected: {emotion} (confidence: {confidence:.2f})")
        
        return jsonify({
            "emotion": emotion,
            "confidence": confidence,
            "all_predictions": {
                label: float(pred[0][i]) 
                for i, label in enumerate(emotion_labels)
            }
        })
        
    except Exception as e:
        print(f"❌ Error in predict: {str(e)}")
        return jsonify({
            "error": str(e),
            "emotion": "Error"
        }), 500

if __name__ == "__main__":
    print("\n" + "="*50)
    print("🤖 Flask Emotion Detection Server")
    print("="*50)
    print(f"Model Status: {'✅ Loaded' if model else '❌ Not Loaded'}")
    print(f"Cascade Status: {'✅ Loaded' if face_cascade else '❌ Not Loaded'}")
    print("Server URL: http://127.0.0.1:5000")
    print("Endpoint: POST http://127.0.0.1:5000/predict")
    print("="*50 + "\n")
    
    app.run(host='0.0.0.0', port=5000, debug=True)
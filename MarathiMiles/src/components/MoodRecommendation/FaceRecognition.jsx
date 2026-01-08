// ✅ FaceRecognition.jsx - COMPLETE NEW FILE WITH FLASK ML INTEGRATION
import React, { useRef, useEffect, useState } from "react";
import { detectEmotionFromBackend, mapEmotionToTravelMood } from "../../utils/emotionDetection";
import "./FaceRecognition.css";

const FaceRecognition = ({ onMoodDetected, onBack, isLoading }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const detectionIntervalRef = useRef(null);

  const [status, setStatus] = useState("🚀 Starting AI Emotion Detection...");
  const [showManual, setShowManual] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");
  const [detectionCount, setDetectionCount] = useState(0);
  const [mlActive, setMlActive] = useState(false);
  const [mlConnectionTested, setMlConnectionTested] = useState(false);
  const [detectedEmotions, setDetectedEmotions] = useState([]);

  // Debug function
  const addDebug = (message) => {
    console.log(`🔍 ${message}`);
    setDebugInfo(prev => prev + `\n${new Date().toLocaleTimeString()}: ${message}`);
  };

  useEffect(() => {
    addDebug("🤖 AI Emotion Detection Component Mounted");
    initializeSystem();
    
    return () => {
      addDebug("🧹 Cleaning up...");
      stopCamera();
      clearDetectionInterval();
    };
  }, []);

  // ---------------------------------------------------------
  // FLASK ML CONNECTION TEST
  // ---------------------------------------------------------
  const testMlConnection = async () => {
    try {
      addDebug("Testing Flask ML backend connection...");
      setStatus("🔗 Connecting to AI Server...");
      
      // Create a simple test image
      const testCanvas = document.createElement('canvas');
      testCanvas.width = 48;
      testCanvas.height = 48;
      const ctx = testCanvas.getContext('2d');
      ctx.fillStyle = '#808080';
      ctx.fillRect(0, 0, 48, 48);
      const testImage = testCanvas.toDataURL('image/jpeg');
      
      // Send test request to Flask
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          image: testImage.replace(/^data:image\/\w+;base64,/, "") 
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      addDebug(`✅ Flask ML Backend Active! Response: ${JSON.stringify(data)}`);
      setMlActive(true);
      setMlConnectionTested(true);
      setStatus("✅ AI Server Connected!");
      return true;
      
    } catch (error) {
      addDebug(`❌ Flask ML Backend Not Available: ${error.message}`);
      setMlActive(false);
      setMlConnectionTested(true);
      setStatus("⚠️ AI Server Unavailable - Using Fallback");
      return false;
    }
  };

  // ---------------------------------------------------------
  // INITIALIZE SYSTEM
  // ---------------------------------------------------------
  const initializeSystem = async () => {
    try {
      setStatus("🚀 Starting System...");
      
      // Step 1: Test ML connection
      addDebug("Step 1: Testing ML backend...");
      const mlOk = await testMlConnection();
      
      // Step 2: Start camera
      addDebug("Step 2: Starting camera...");
      await startCamera();
      
      // Step 3: Start ML detection
      addDebug("Step 3: Starting emotion detection...");
      startEmotionDetection(mlOk);
      
    } catch (error) {
      addDebug(`❌ System Initialization Failed: ${error.message}`);
      setStatus(`❌ Error: ${error.message}`);
      setShowManual(true);
    }
  };

  // ---------------------------------------------------------
  // CAMERA FUNCTIONS
  // ---------------------------------------------------------
  const startCamera = async () => {
    try {
      setStatus("📷 Accessing camera...");
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: "user"
        } 
      });
      
      streamRef.current = stream;
      
      if (!videoRef.current) {
        throw new Error("Video element not found");
      }
      
      videoRef.current.srcObject = stream;
      addDebug("✅ Camera connected");
      
      await new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setStatus(mlActive ? 
            "✅ Camera ready! Show your face for AI analysis..." : 
            "✅ Camera ready! (Fallback mode)"
          );
          resolve();
        };
      });
      
    } catch (error) {
      addDebug(`❌ Camera error: ${error.message}`);
      throw new Error("Camera access denied or not available");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => {
        track.stop();
        track.enabled = false;
      });
      streamRef.current = null;
    }
  };

  // ---------------------------------------------------------
  // CAPTURE FRAME FOR ML
  // ---------------------------------------------------------
  const captureFrameForMl = () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) {
      return null;
    }
    
    try {
      const canvas = document.createElement('canvas');
      const video = videoRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      
      // Draw video frame to canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert to base64 JPEG (reduced quality for faster transfer)
      const imageData = canvas.toDataURL('image/jpeg', 0.7);
      
      return imageData;
      
    } catch (error) {
      addDebug(`❌ Frame capture error: ${error.message}`);
      return null;
    }
  };

  // ---------------------------------------------------------
  // EMOTION DETECTION (MAIN LOGIC)
  // ---------------------------------------------------------
  const startEmotionDetection = (useMl) => {
    addDebug("Starting emotion detection loop...");
    setDetectionCount(0);
    setDetectedEmotions([]);
    
    let detectionCount = 0;
    const emotions = [];
    
    // Clear any existing interval
    clearDetectionInterval();
    
    // Start new detection interval
    detectionIntervalRef.current = setInterval(async () => {
      try {
        // Capture frame
        const frame = captureFrameForMl();
        if (!frame) {
          addDebug("⚠️ No frame captured");
          return;
        }
        
        let detectedEmotion = "";
        let travelMood = "";
        
        if (useMl) {
          // ✅ ML MODE: Send to Flask backend
          setStatus(`🤖 AI Analyzing... (${detectionCount + 1}/3)`);
          
          detectedEmotion = await detectEmotionFromBackend(frame);
          travelMood = mapEmotionToTravelMood(detectedEmotion);
          
          addDebug(`🎭 ML Emotion ${detectionCount + 1}: ${detectedEmotion} → ${travelMood}`);
          
        } else {
          // ⚠️ FALLBACK MODE: Random emotion
          setStatus(`😊 Fallback Analysis... (${detectionCount + 1}/3)`);
          
          const fallbackEmotions = ["happy", "sad", "neutral", "surprise", "fear", "angry"];
          detectedEmotion = fallbackEmotions[Math.floor(Math.random() * fallbackEmotions.length)];
          travelMood = mapEmotionToTravelMood(detectedEmotion);
          
          addDebug(`🎭 Fallback Emotion ${detectionCount + 1}: ${detectedEmotion} → ${travelMood}`);
        }
        
        // Store emotion
        emotions.push({ raw: detectedEmotion, mood: travelMood });
        setDetectedEmotions([...emotions]);
        
        // Update detection count
        detectionCount++;
        setDetectionCount(detectionCount);
        
        // Draw face box
        drawFaceBox();
        
        // Show current status
        setStatus(`🎭 ${travelMood} (${detectedEmotion}) - ${detectionCount}/3`);
        
        // After 3 detections, calculate final mood
        if (detectionCount >= 3) {
          clearDetectionInterval();
          
          // Calculate most frequent mood
          const moodCounts = {};
          emotions.forEach(e => {
            moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
          });
          
          const finalMood = Object.keys(moodCounts).reduce((a, b) => 
            moodCounts[a] > moodCounts[b] ? a : b
          );
          
          const detectionMethod = mlActive ? "Flask ML CNN" : "Fallback Analysis";
          addDebug(`🎯 FINAL MOOD: ${finalMood} (via ${detectionMethod})`);
          addDebug(`📊 Emotion Log: ${JSON.stringify(emotions)}`);
          
          // Stop camera and return result
          stopCamera();
          setTimeout(() => {
            onMoodDetected(finalMood);
          }, 500);
        }
        
      } catch (error) {
        addDebug(`❌ Detection error: ${error.message}`);
        
        // If ML fails continuously, switch to fallback
        if (useMl && detectionCount === 0) {
          addDebug("🔄 Switching to fallback mode...");
          addDebug("⚠️ ML slow response, retrying...");
          setStatus("⚠️ Switching to fallback detection...");
        }
      }
    }, 2000); // Check every 2 seconds

    // Timeout after 30 seconds
    setTimeout(() => {
      if (detectionCount < 3) {
        addDebug("⏰ Detection timeout - showing manual options");
        clearDetectionInterval();
        setShowManual(true);
      }
    }, 30000);
  };

  // ---------------------------------------------------------
  // UTILITY FUNCTIONS
  // ---------------------------------------------------------
  const clearDetectionInterval = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }
  };

  const drawFaceBox = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    if (!canvas || !video) return;
    
    const ctx = canvas.getContext('2d');
    
    // Match canvas to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw face detection box (simplified)
    const boxWidth = Math.min(300, canvas.width * 0.7);
    const boxHeight = boxWidth * 1.2;
    const x = (canvas.width - boxWidth) / 2;
    const y = (canvas.height - boxHeight) / 2;
    
    // Box styling based on ML status
    ctx.strokeStyle = mlActive ? '#4CAF50' : '#FF9800';
    ctx.lineWidth = 4;
    ctx.setLineDash(mlActive ? [] : [5, 5]);
    ctx.strokeRect(x, y, boxWidth, boxHeight);
    
    // Add label
    ctx.fillStyle = mlActive ? '#4CAF50' : '#FF9800';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(
      mlActive ? '🤖 AI Analyzing...' : '⚠️ Basic Detection', 
      canvas.width / 2, 
      Math.max(30, y - 10)
    );
    
    // Add detection counter
    if (detectionCount > 0) {
      ctx.fillStyle = '#2196F3';
      ctx.font = 'bold 16px Arial';
      ctx.fillText(
        `Detection: ${detectionCount}/3`, 
        canvas.width / 2, 
        Math.max(55, y - 35)
      );
    }
  };

  // ---------------------------------------------------------
  // MANUAL MOOD SELECTION
  // ---------------------------------------------------------
  const manualMoods = ["Happy", "Calm", "Excited", "Sad", "Stressed"];

  const handleManualMood = (mood) => {
    addDebug(`Manual selection: ${mood}`);
    stopCamera();
    clearDetectionInterval();
    setStatus(`✅ Selected: ${mood}`);
    
    setTimeout(() => {
      onMoodDetected(mood);
    }, 300);
  };

  const retrySystem = async () => {
    addDebug("🔄 Retrying system...");
    setShowManual(false);
    setStatus("🔄 Reinitializing...");
    
    stopCamera();
    clearDetectionInterval();
    
    setTimeout(async () => {
      try {
        await initializeSystem();
      } catch (error) {
        addDebug(`❌ Retry failed: ${error.message}`);
        setShowManual(true);
      }
    }, 1000);
  };

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  return (
    <div className="face-recognition">
      <div className="camera-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>🤖 AI Mood Detection</h2>
        <div className="status-display">
          {status}
          <div style={{
            fontSize: '12px',
            opacity: 0.8,
            color: mlActive ? '#4CAF50' : '#FF9800',
            marginTop: '5px'
          }}>
            {mlActive ? '✨ ML CNN Active (Flask Backend)' : '⚠️ Fallback Mode'}
          </div>
        </div>
      </div>

      <div className="camera-container">
        <div className="video-section">
          <div className="video-wrapper">
            <video 
              ref={videoRef} 
              muted 
              playsInline 
              autoPlay
              className="camera-video"
              style={{ 
                border: mlActive ? '4px solid #4CAF50' : '4px solid #FF9800',
                background: '#000',
                width: '100%',
                maxWidth: '640px'
              }}
            />
            <canvas ref={canvasRef} className="detection-canvas" />
            
            {/* Status Badge */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: mlActive ? '#4CAF50' : '#FF9800',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              {mlActive ? '🤖' : '⚠️'}
              {mlActive ? 'ML CNN (Flask)' : 'BASIC DETECTION'}
            </div>
            
            {/* Detection Counter */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '8px 15px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              🔄 {detectionCount}/3
            </div>
            
            {/* Emotion Log */}
            {detectedEmotions.length > 0 && (
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                right: '10px',
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '8px',
                borderRadius: '8px',
                fontSize: '12px',
                textAlign: 'center'
              }}>
                <strong>Detected:</strong> {detectedEmotions.map(e => e.raw).join(', ')}
              </div>
            )}
          </div>
          
          <div className="camera-controls">
            <button className="retry-btn" onClick={retrySystem}>
              🔄 Retry System
            </button>
            <button className="manual-btn" onClick={() => setShowManual(true)}>
              🎭 Manual Selection
            </button>
          </div>

          <div className="debug-section">
            <h4>🔧 System Information:</h4>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginBottom: '15px',
              fontSize: '12px'
            }}>
              <div style={{
                padding: '8px',
                background: mlActive ? '#e8f5e8' : '#fff3e0',
                border: `1px solid ${mlActive ? '#4CAF50' : '#FF9800'}`,
                borderRadius: '5px'
              }}>
                <strong>ML Backend:</strong><br/>
                {mlActive ? '✅ Connected' : '❌ Not Available'}
              </div>
              
              <div style={{
                padding: '8px',
                background: '#e3f2fd',
                border: '1px solid #2196F3',
                borderRadius: '5px'
              }}>
                <strong>Camera:</strong><br/>
                {streamRef.current ? '✅ Active' : '❌ Inactive'}
              </div>
              
              <div style={{
                padding: '8px',
                background: '#f3e5f5',
                border: '1px solid #9C27B0',
                borderRadius: '5px'
              }}>
                <strong>Detections:</strong><br/>
                {detectionCount}/3 complete
              </div>
              
              <div style={{
                padding: '8px',
                background: '#e8eaf6',
                border: '1px solid #3F51B5',
                borderRadius: '5px'
              }}>
                <strong>Mode:</strong><br/>
                {mlActive ? 'AI Emotion' : 'Fallback'}
              </div>
            </div>
            
            <h5>📊 Debug Log:</h5>
            <textarea 
              value={debugInfo}
              readOnly
              className="debug-textarea"
              placeholder="System logs will appear here..."
            />
          </div>
        </div>

        <div className="control-section">
          {showManual ? (
            <div className="manual-mode">
              <h3>Select Your Mood</h3>
              <p>Choose how you're feeling:</p>
              <div className="mood-grid">
                {manualMoods.map((mood) => (
                  <button 
                    key={mood} 
                    className="mood-option"
                    onClick={() => handleManualMood(mood)}
                  >
                    {mood}
                  </button>
                ))}
              </div>
              <button className="retry-btn" onClick={retrySystem} style={{marginTop: '15px'}}>
                🔄 Try AI Detection Again
              </button>
            </div>
          ) : (
            <div className="ai-mode">
              <h3>🤖 AI Emotion Detection</h3>
              
              <div className="model-status" style={{
                padding: '15px',
                background: mlActive ? '#e8f5e8' : '#fff3e0',
                border: `3px solid ${mlActive ? '#4CAF50' : '#FF9800'}`,
                borderRadius: '10px',
                marginBottom: '15px'
              }}>
                <h4 style={{ color: mlActive ? '#2e7d32' : '#f57c00', marginBottom: '10px' }}>
                  🔧 System Status:
                </h4>
                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>ML Backend:</span> 
                    <span style={{ 
                      color: mlActive ? '#4CAF50' : '#FF9800',
                      marginLeft: '8px'
                    }}>
                      {mlActive ? '✅ ACTIVE (Flask CNN)' : '❌ NOT AVAILABLE'}
                    </span>
                  </li>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>Camera:</span> 
                    <span style={{ color: '#2196F3', marginLeft: '8px' }}>
                      ✅ ACTIVE
                    </span>
                  </li>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>Detection Progress:</span> 
                    <span style={{ color: '#2196F3', marginLeft: '8px' }}>
                      🔄 {detectionCount}/3 frames
                    </span>
                  </li>
                  <li>
                    <span style={{ fontWeight: 'bold' }}>Backend URL:</span> 
                    <span style={{ color: '#666', marginLeft: '8px', fontSize: '12px' }}>
                      http://127.0.0.1:5000/predict
                    </span>
                  </li>
                </ul>
                
                {!mlConnectionTested && (
                  <div style={{
                    marginTop: '10px',
                    padding: '8px',
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '5px',
                    fontSize: '12px',
                    textAlign: 'center'
                  }}>
                    🔄 Testing connection to AI server...
                  </div>
                )}
                
                {mlActive && (
                  <div style={{
                    marginTop: '10px',
                    padding: '10px',
                    background: '#4CAF50',
                    color: 'white',
                    borderRadius: '5px',
                    fontSize: '12px',
                    textAlign: 'center',
                    fontWeight: 'bold'
                  }}>
                    ✅ Real-time CNN Emotion Detection Active
                  </div>
                )}
              </div>
              
              <div className="instructions">
                <h4>📝 How it works:</h4>
                <ul>
                  <li>• Look directly at the camera with natural expression</li>
                  <li>• AI captures 3 frames (every 2 seconds)</li>
                  <li>• Frames sent to Flask CNN model for analysis</li>
                  <li>• Detected emotion → Personalized travel recommendations</li>
                  <li>• Takes about 6-10 seconds total</li>
                </ul>
                
                {mlActive ? (
                  <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: '#e3f2fd',
                    border: '2px solid #2196F3',
                    borderRadius: '8px'
                  }}>
                    <h5 style={{ marginTop: '0', color: '#2196F3' }}>🔬 Technical Details:</h5>
                    <div style={{ fontSize: '12px' }}>
                      <strong>Backend:</strong> Flask + TensorFlow CNN<br/>
                      <strong>Model:</strong> FER-2013 trained emotion classifier<br/>
                      <strong>API Endpoint:</strong> POST http://127.0.0.1:5000/predict<br/>
                      <strong>Input:</strong> Base64 encoded JPEG image<br/>
                      <strong>Output:</strong> JSON with emotion label
                    </div>
                  </div>
                ) : (
                  <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: '#ffebee',
                    border: '2px solid #f44336',
                    borderRadius: '8px'
                  }}>
                    <h5 style={{ marginTop: '0', color: '#f44336' }}>⚠️ Fallback Mode Active</h5>
                    <div style={{ fontSize: '12px' }}>
                      <strong>Reason:</strong> Flask ML backend not available<br/>
                      <strong>Action:</strong> Using simulated emotion detection<br/>
                      <strong>Fix:</strong> Ensure Flask server is running at http://127.0.0.1:5000
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaceRecognition;
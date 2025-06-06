import React, { useRef, useEffect } from "react";
import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";

const MODEL_URL = process.env.PUBLIC_URL + "/model/model.json"; // Path to your converted model

const FaceRecognition = () => {
  const videoRef = useRef();
  const modelRef = useRef();

  useEffect(() => {
    const setup = async () => {
      // Start webcam
      await navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        });

      // Load detection and recognition models
      const detector = await blazeface.load();
      const recognitionModel = await tf.loadLayersModel(MODEL_URL);
      modelRef.current = recognitionModel;

      videoRef.current.onloadeddata = async () => {
        setInterval(async () => {
          const predictions = await detector.estimateFaces(videoRef.current, false);
          if (predictions.length > 0) {
            // For each detected face
            for (const pred of predictions) {
              // Crop face from video
              const [startX, startY] = pred.topLeft;
              const [endX, endY] = pred.bottomRight;
              const width = endX - startX;
              const height = endY - startY;

              // Create a tensor from the video frame
              const videoTensor = tf.browser.fromPixels(videoRef.current);
              const faceTensor = videoTensor.slice(
                [Math.round(startY), Math.round(startX), 0],
                [Math.round(height), Math.round(width), 3]
              ).resizeBilinear([160, 160]).expandDims(0).toFloat().div(255);

              // Get prediction (classification)
              const prediction = modelRef.current.predict(faceTensor);
              const predictionData = await prediction.data();
              const predictedClassIndex = predictionData.indexOf(Math.max(...predictionData));

              // You should have class names in the same order as your model was trained
              const classNames = ["Person1", "Person2", "Person3"]; // <-- Update with your actual class names

              const predictedName = classNames[predictedClassIndex];
              console.log("Predicted:", predictedName);

              videoTensor.dispose();
              faceTensor.dispose();
              prediction.dispose();
            }
          }
        }, 1000);
      };
    };
    setup();
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay muted width="720" height="560" style={{ border: "1px solid #ccc" }} />
      <p>Face recognition embeddings will appear in the console.</p>
    </div>
  );
};

export default FaceRecognition;
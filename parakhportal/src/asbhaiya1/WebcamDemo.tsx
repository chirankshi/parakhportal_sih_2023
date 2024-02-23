import Webcam from 'react-webcam';
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

const width = 150;
const height = 150;

const WebcamDemo = (): JSX.Element => {
  const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
    faceDetectionOptions: {
      model: 'short',
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame }: CameraOptions) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  return (
    <div>
        <p>{`Face Detected: ${detected}`}</p>
        <p>{`Number of faces detected: ${facesDetected}`}</p>
      {/* <p>{`Loading: ${isLoading}`}</p>
    
      
      <div style={{ width, height, position: 'relative' }}> */}
       
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          style={{
            height,
            width:"full",
            
          }}
        />
   
    </div>
  );
};

export default WebcamDemo;
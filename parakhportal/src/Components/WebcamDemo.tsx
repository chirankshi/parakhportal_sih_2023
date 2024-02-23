import Webcam from 'react-webcam';
import { CameraOptions, useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react'

const width = 400;
const height = 200;

const WebcamDemo = (): JSX.Element => {
  const toast = useToast();
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
    
  // if(facesDetected===2){

  //     toast({
  //       title: 'suspicious',
  //       description: "You are Doing Something wrong.",
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //       position:"top"
  //     })
   
    
  // }

  useEffect(()=>{
   
  const timer =  setTimeout(()=>{
    if(facesDetected===2){
      toast({
        title: 'Illegal Activity',
        description: "You are Doing Something Wrong.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
   },5000)
   
  },[facesDetected])

  return (
   <Box w={"100%"} border={"3px solid blue"}>
        {/* <p>{`Face Detected: ${detected}`}</p>
        <p>{`Number of faces detected: ${facesDetected}`}</p> */}
      {/* <p>{`Loading: ${isLoading}`}</p>
    
      
      <div style={{ width, height, position: 'relative' }}> */}
       
        <Webcam
          ref={webcamRef}
          forceScreenshotSourceSize
          style={{
           height:"150px",
            width:"500px",
            
          }}
        />
   
   </Box>
  );
};

export default WebcamDemo;
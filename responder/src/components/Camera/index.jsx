import { useEffect, useState, useRef } from 'react';

import firebase from 'firebase/app';
import '@firebase/firestore';
import anime from 'animejs';
import * as faceapi from 'face-api.js';
import * as utils from './utils.js';

import './style.scss';
const firebaseConfig = {
  apiKey: "AIzaSyAgrn5KXE94CLjbL-HpvmVFzFA8MfvYUQI",
  authDomain: "lahac-2cd8d.firebaseapp.com",
  projectId: "lahac-2cd8d",
  storageBucket: "lahac-2cd8d.appspot.com",
  messagingSenderId: "33534845680",
  appId: "1:33534845680:web:3e6dfdcd09c480e6a89835"
};

const thing = new utils.HeartRateFinder(256);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

// Global State
const pc = new RTCPeerConnection(servers);
let remoteStream = null;

let firstChange = false;
let cameraAnimation, cameraAnimationDown;
let interval2 = null;

const Camera = (props) => {
  const [clientId, setId] = useState('');
  const cameraRef = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const tempCanvasRef = useRef(null);

  useEffect(() => {
    const callDoc = firestore.collection('calls');

    // Animations to transition from log to dial
    cameraAnimation = anime({
      targets: '.camera',
      translateY: 1000,
      duration: 2000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
      begin: function() {
        document.querySelector('.camera').style.display = 'block';
      },
    });
    cameraAnimationDown = anime({
      targets: '.contact-box',
      translateY: 0,
      duration: 2000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
    });

    callDoc.onSnapshot((snapshot) => {
      if (snapshot && firstChange) {
        snapshot.docChanges().forEach((change) => {
          console.log(change);
          if (change.type === 'added') {
            let id = change.doc.id;
            setId(id);
          }
        });
      } else {
        console.log('twice');
        firstChange = true;
      }
    });
  }, []);

  useEffect(() => {
    remoteStream = new MediaStream();
  
    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };
  
    cameraRef.current.srcObject = remoteStream;
  }, []);

  let heartRate = 70;
  let interval;
  useEffect(async () => {
    //const callId = inputRef.current.value;
    if (clientId && props.startTakingInCalls) {
      console.log('TAKING IN CALLS NOW');
      const callDoc = firestore.collection('calls').doc(clientId);
      const answerCandidates = callDoc.collection('answerCandidates');
      const offerCandidates = callDoc.collection('offerCandidates');
    
      pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };
    
      const callData = (await callDoc.get()).data();
    
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
    
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);
    
      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };
    
      await callDoc.update({ answer });
    
      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          console.log(change);
          if (change.type === 'added') {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
      // THERE IS A CALL, LET'S ANIMATE THE DIV IN
      cameraAnimation.play();
      cameraAnimationDown.play();

      // FACE API
      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
        faceapi.nets.faceExpressionNet.loadFromUri('/models')
      ]).then(() => {

        interval2 = setInterval(async () => {
              // WebRTC is too laggy on our shitty computers to use the heart rate software,
              // math.random for purpose of demo, remove later
          heartRate = Math.random() * 20 + 50;
          const video = document.getElementsByTagName('video')[0];
          if (video) {
            const detections2 = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
            if (detections2 && detections2.expressions) {
              let mood = 'angry';
              let max = 0;
              console.log(detections2.expressions);            
            }
          }
        }, 10000)

      interval = setInterval(async () => {
        //capture();
        const canvas = canvasRef.current;
        const tempCanvas = tempCanvasRef.current;
        const image = imageRef.current;
        canvas.width = Math.max(document.documentElement.clientWidth, window.innerWidth) * 0.26;
        canvas.height = (Math.max(document.documentElement.clientHeight, window.innerHeight) * 0.815) - 20;
        
        //const tempCanvas = tempCanvasRef.current;
        //const image = imageRef.current;
        //const displaySize = { width: 1280, height: 720 }
        const video = document.getElementsByTagName('video')[0];
        //if (video && canvas && tempCanvas && image && webcamRef.current) {
          const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions());//.withFaceExpressions();
          //console.log('drawing');
          //console.log(resizedDetections);
          if (detections && video && canvas && cameraRef.current) {
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            //const resizedDetections = faceapi.resizeResults(detections, {width: canvas.width, height: canvas.height});
            //console.log(resizedDetections);
            const box = detections.box;
            const ctx = canvas.getContext('2d');
            const x = ((canvas.width / 2) - (450 - box.x));
            //const width = normalizedWidth * canvas.width;
            const y = box.y * (canvas.height / 900);
            const height = box.height * (canvas.height / 900);
            ctx.beginPath();
            var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop("0", "#0761FF");
            gradient.addColorStop("0.5", "#FF59F8");
            gradient.addColorStop("1", "#AE72FF");
            //#0761FF -53.27%, #FF59F8 89.25%, #AE72FF 139.44%
            ctx.lineWidth = "6";
            ctx.strokeStyle = gradient;
            ctx.rect(box.x, box.y, box.width, box.height);
            const foreheadCoords = utils.getForeheadCoords(box.x, box.y, box.width, box.height);

            ctx.stroke();
        
          //const imageSrc = webcamRef.current.getScreenshot();
          //image.src = imageSrc;
          //image.onload = () => {
            // Throw the image element on the canvas
            const ctx2 = tempCanvas.getContext('2d');
            ctx2.drawImage(video, 0, 0, 2000, 2000);

            //const data = canvas.toDataURL('image/png');
            //photo.setAttribute('src', data);
            //console.log(tempCanvas);

            // Pull the image data from the canvas
            //console.log(foreheadCoords);
            const imageData = ctx2.getImageData(foreheadCoords.x, foreheadCoords.y, foreheadCoords.width, foreheadCoords.height);
            ctx2.clearRect(0, 0, 2000, 2000);
            // TODO: Move heart rate;
            //console.log(imageData);
            if(imageData && imageData.data) {
              //thing.updateHeartRate(imageData.data);
            }
            //console.log(thing.heartRate);
          //}}
          }
        }, 10000 / 20);
      })
    };
  }, [clientId]);

  return (
    <div className="camera">
      <video ref={cameraRef} className="webcam-video" autoPlay playsInline></video>
      <canvas ref={canvasRef}/>
      <canvas className="temp-canvas" ref={tempCanvasRef} />
      <img ref={imageRef}/>
    </div>
  )
}

export default Camera;
import { useCallback, useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button } from 'antd';
import CameraPic from '../../assets/camera.svg';
import BackBubble from '../../assets/back-bubble.svg';

import Heart from '../Heart';

import './style.scss';

import firebase from 'firebase/app';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAgrn5KXE94CLjbL-HpvmVFzFA8MfvYUQI',
  authDomain: 'lahac-2cd8d.firebaseapp.com',
  projectId: 'lahac-2cd8d',
  storageBucket: 'lahac-2cd8d.appspot.com',
  messagingSenderId: '33534845680',
  appId: '1:33534845680:web:3e6dfdcd09c480e6a89835',
};

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
//local
// Global State
const pc = new RTCPeerConnection(servers);
let localStream = null;

const CameraComponent = (props) => {
  const webcamRef = useRef(null);
  const webcamRefTwo = useRef(null);
  const imageRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('');
  //const inputRef = useRef(null);
  //const [stream, setStream] = useState();

  const videoConstraints = {
    width: 812,
    height: 812,
    facingMode: 'user',
  };

  useEffect(() => {
    props.socket.emit('joinRoom', 1);
  }, []);

  const takePicture = () => {
    canvasRef.current.width = 812;
    canvasRef.current.height = 812;
    var context = canvasRef.current.getContext('2d');
    context.fillRect(0, 0, 812, 812);
    context.drawImage(webcamRef.current, 0, 0, 812, 812);
    const base64Canvas = canvasRef.current.toDataURL("image/jpeg");
    //console.log(base64Canvas);
    //setImageSrc(base64Canvas)
   // imageRef.current.setAttribute('src' ,base64Canvas);
   props.socket.emit('imageSend', {
     user_type: 'user',
     image: base64Canvas
   })
  }

  const startCam = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // Push tracks from local stream to peer connection
    localStream.getTracks().forEach((track) => {
      track.applyConstraints(videoConstraints);
      pc.addTrack(track, localStream);
    });

    webcamRef.current.srcObject = localStream;

    const callDoc = firestore.collection('calls').doc();
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');

    //inputRef.current.value = callDoc.id;

    // Get candidates for caller, save to db
    pc.onicecandidate = (event) => {
      event.candidate && offerCandidates.add(event.candidate.toJSON());
    };

    // Create offer
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    };

    await callDoc.set({ offer });

    // Listen for remote answer
    callDoc.onSnapshot((snapshot) => {
      const data = snapshot.data();
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer);
        pc.setRemoteDescription(answerDescription);
      }
    });

    // When answered, add candidate to peer connection
    answerCandidates.onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });
  };

  return (
    <div className="cameras">
      <h1>T</h1>
      <div className="back" onClick={() => props.setClick('')}>
        <img src={BackBubble} />
      </div>
      <Heart BPM={props.BPM} setBPM={props.setBPM} />
      <video
        ref={webcamRef}
        className="webcam-video"
        autoPlay
        playsInline
      ></video>
      <button className="call-button-three" onClick={startCam}>
        Start Own Cam
      </button>
      <Button className="picture"
        onClick={takePicture}>
        <img src={CameraPic} style={{ marginRight: '8px' }} />
        Take Picture
      </Button>
      <canvas ref={canvasRef}/>
      <img src={imageSrc} ref={imageRef}/>
    </div>
  );
};

export default CameraComponent;

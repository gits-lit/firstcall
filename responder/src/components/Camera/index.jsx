import { useEffect, useState, useRef } from 'react';

import firebase from 'firebase/app';
import '@firebase/firestore';
import './style.scss';
const firebaseConfig = {
  apiKey: "AIzaSyAgrn5KXE94CLjbL-HpvmVFzFA8MfvYUQI",
  authDomain: "lahac-2cd8d.firebaseapp.com",
  projectId: "lahac-2cd8d",
  storageBucket: "lahac-2cd8d.appspot.com",
  messagingSenderId: "33534845680",
  appId: "1:33534845680:web:3e6dfdcd09c480e6a89835"
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

// Global State
const pc = new RTCPeerConnection(servers);
let remoteStream = null;

let firstChange = false;
const Camera = (props) => {
  const [startTakingInCalls, setStartTakingInCalls] = useState(false);
  const [clientId, setId] = useState('');
  const cameraRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const callDoc = firestore.collection('calls');

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

  useEffect(async () => {
    //const callId = inputRef.current.value;
    if (clientId && startTakingInCalls) {
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
    }
  }, [clientId]);

  return (
    <>
      <video ref={cameraRef} className="webcam-video" autoPlay playsInline></video>
      <button className="call-button" onClick={() => {
        setStartTakingInCalls(true);
      }}>Take in Calls</button>
      <input className="test-input" ref={inputRef} />
    </>
  )
}

export default Camera;
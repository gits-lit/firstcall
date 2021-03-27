import { useEffect, useState, useRef } from 'react';
import Peer from 'simple-peer';

import './style.scss';
let remoteStream;
const Camera = (props) => {
  const [clientId, setUser] = useState('');
  //const [callerSignal, setCallerSignal] = useState('');
  //const [src, setSrc] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
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

    remoteStream = new MediaStream();

    // Pull tracks from remote stream, add to video stream
    pc.ontrack = (event) => {
      console.log('pulling tracks');
      event.streams[0].getTracks().forEach((track) => {
        remoteStream.addTrack(track);
      });
    };

    if (cameraRef && cameraRef.current) {
      cameraRef.current.srcObj = remoteStream;
      console.log('hi');
    }

    pc.onicecandidate = (event) => {
      console.log('ON ICe')
      if (clientId && event.candidate) {
        console.log('ON ICE2')
        //console.log(clientId);
        props.socket.emit('webrtc', {
          sendTo: clientId,
          phase: 'added',
          datatwo: event.candidate.toJSON()
        })
      }
    };
  

    props.socket.on('webrtc', async (data) => {
      console.log('id');
      console.log(data.clientId);
      if (data.phase === 'call') {
        console.log('here');
        const offerDescription = data.offer;
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
      
        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        };
        console.log(data.clientId);
        props.socket.emit('webrtc', {
          sendTo: data.clientId,
          phase: 'answer',
          answer: answer
        })
      }
      else if (data.phase === 'added') {
        console.log('added');
        pc.addIceCandidate(new RTCIceCandidate(data.datatwo));
      }
    });
  }, []);

  return (
    <video ref={cameraRef} className="webcam-video" autoplay playsinline></video>
  )
}

export default Camera;
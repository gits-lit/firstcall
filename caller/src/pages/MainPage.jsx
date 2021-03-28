import React, { useEffect, useState } from 'react';

import CameraPage from './CameraPage';
import HelpETA from '../components/HelpETA';
import Messages from '../components/Messages';
import NavBar from '../components/NavBar';
import SelfInfo from '../components/SelfInfo';
import TopBar from '../components/TopBar';
import Map from '../components/Map';

import socketIOClient from 'socket.io-client';
import anime from 'animejs';

const ENDPOINT = 'https://firstcall-snu.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

let messagesAnimation;
const MainPage = () => {
  const [click, setClick] = useState('message');

  useEffect(() => {
    // Animations to ransition from log to dial
    messagesAnimation = anime({
      targets: '.messages',
      translateY: -1000 - (0.08 * window.innerHeight),
      duration: 2000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });
  }, [])

  return (
    <div>
      <TopBar />
      <NavBar
        click={click}
        setClick={(clickInput) => {
          setClick(clickInput);
              if (click === 'message') {
                messagesAnimation.play();
              }
        }}
      />
      {click === 'message' ? (
        <div>
        <Messages socket={socket}/>
        </div>
      ) : click === 'info' ? (
        <SelfInfo socket={socket} />
      ) : click === 'camera' ? (
        <CameraPage setClick={setClick} socket={socket} />
      ) : click === 'help' ? (
        <div>
          <HelpETA />
        </div>
      ) : (
        <></>
      )}
      <Map />
    </div>
  );
};

export default MainPage;

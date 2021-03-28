import React, { useState } from 'react';

import CameraPage from './CameraPage';
import HelpETA from '../components/HelpETA';
import Messages from '../components/Messages';
import NavBar from '../components/NavBar';
import SelfInfo from '../components/SelfInfo';
import TopBar from '../components/TopBar';

import socketIOClient from 'socket.io-client';

const ENDPOINT = 'https://firstcall-snu.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

const MainPage = () => {
  const [click, setClick] = useState('message');
  return (
    <div>
      <TopBar />
      <NavBar
        click={click}
        setClick={(clickInput) => {
          setClick(clickInput);
        }}
      />
      {click === 'message' ? (
        <div>
          <Messages socket={socket}/>
        </div>
      ) : click === 'info' ? (
        <SelfInfo socket={socket} />
      ) : click === 'camera' ? (
        <CameraPage setClick={setClick} />
      ) : click === 'help' ? (
        <div>
          <HelpETA />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainPage;

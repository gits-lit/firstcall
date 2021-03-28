import React, { useState } from 'react';

import HelpETA from '../components/HelpETA'
import NavBar from '../components/NavBar'
import SelfInfo from '../components/SelfInfo'
import TopBar from '../components/TopBar'

import socketIOClient from "socket.io-client";

const ENDPOINT = 'https://firstcall-snu.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

const MainPage = () => {
  const [click, setClick] = useState('message');
  return (
    <div>
    <TopBar />
    <NavBar click={click}
      setClick={(clickInput) => {
        setClick(clickInput);
      }}
    />
    {
      click === 'message' ?
        <div>

        </div>
      : click === 'info' ?
        <div>
          <SelfInfo socket={socket}/>
        </div> 
      : click === 'help' ?
        <div>
          <HelpETA />
        </div>
      : click === 'camera' ?
        <div>
          camera
        </div> :
      <></>
    }
  </div>
  )
}

export default MainPage;
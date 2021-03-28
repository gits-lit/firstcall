import React, { useState } from 'react';

import HelpETA from '../components/HelpETA'
import Messages from '../components/Messages'
import NavBar from '../components/NavBar'
import SelfInfo from '../components/SelfInfo'
import TopBar from '../components/TopBar'

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
          <Messages />
        </div>
      : click === 'info' ?
        <div>
          <SelfInfo />
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
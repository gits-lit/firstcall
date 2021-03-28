import React, { useState } from 'react';

import NavBar from '../components/NavBar'
import TopBar from '../components/TopBar'

const MainPage = () => {
  const [click, setClick] = useState('log');
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
          message
        </div>
      : click === 'info' ?
        <div>
          info
        </div> 
      : click === 'help' ?
        <div>
          help
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
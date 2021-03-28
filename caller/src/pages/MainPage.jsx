import React, { useState } from 'react';

import HelpETA from '../components/HelpETA';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import CameraPage from './CameraPage';

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
          <HelpETA />
        </div>
      ) : click === 'info' ? (
        <div>info</div>
      ) : click === 'help' ? (
        <div>help</div>
      ) : click === 'camera' ? (
        <div>
          <CameraPage />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainPage;

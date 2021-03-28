import React, { useState } from 'react';

<<<<<<< HEAD
import HelpETA from '../components/HelpETA';
import NavBar from '../components/NavBar';
import TopBar from '../components/TopBar';
import CameraPage from './CameraPage';
=======
import HelpETA from '../components/HelpETA'
import NavBar from '../components/NavBar'
import SelfInfo from '../components/SelfInfo'
import TopBar from '../components/TopBar'
>>>>>>> 2a0bd51bc6bd8fea956f4337471d4288bac5c926

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
<<<<<<< HEAD
          <HelpETA />
=======

>>>>>>> 2a0bd51bc6bd8fea956f4337471d4288bac5c926
        </div>
      ) : click === 'info' ? (
        <div>info</div>
      ) : click === 'help' ? (
        <div>help</div>
      ) : click === 'camera' ? (
        <div>
<<<<<<< HEAD
          <CameraPage />
=======
          <SelfInfo />
        </div> 
      : click === 'help' ?
        <div>
          <HelpETA />
>>>>>>> 2a0bd51bc6bd8fea956f4337471d4288bac5c926
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainPage;

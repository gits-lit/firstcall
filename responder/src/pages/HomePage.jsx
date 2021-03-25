import React, {useState} from 'react';

import CallCenter from '../components/CallCenter';
import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import SideBar from '../components/SideBar';

import LogPage from '../pages/LogPage';

const HomePage = () => {
  const [click, setClick] = useState('log');

  return (
    <div>
      <SideBar click={click}
        setClick={(clickInput) => {
          setClick(clickInput);
        }}
      />
      {
        click === 'log' ?
          <ParentPage>
            <NavBar />
            <CallCenter />
            <LogPage />
          </ParentPage>
        : click === 'dial' ?
          <div>
            test dial
          </div> 
        : click === 'stats' ?
          <div>
            test stats
          </div> :
        <></>
      }
    </div>
  )
}

export default HomePage;
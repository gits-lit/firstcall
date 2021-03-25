import React, {useState} from 'react';

import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import SideBar from '../components/SideBar';

import LogPage from '../pages/LogPage';

const HomePage = () => {
  const [click, setClick] = useState('log');

  const setCall = (lng, lat) => {
    if (window.map) {
      window.map.easeTo({
        pitch: 60,
        center: [lng, lat]
      })
    }
  }

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
            <LogPage setCall={setCall} />
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
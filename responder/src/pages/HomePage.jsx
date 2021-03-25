import React, {useState} from 'react';

import CallCenter from '../components/CallCenter';
import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import SideBar from '../components/SideBar';

import LogPage from '../pages/LogPage';

import { clearMarkers } from '../components/Map';

const HomePage = () => {
  const [click, setClick] = useState('log');
  const [markerVisibility, setMarkerVisibility] = useState(true);

  const setCall = (lng, lat) => {
    setClick('dial');
    if (window.map) {
      console.log('moving map');
      window.map.easeTo({
        pitch: 60,
        center: [lng, lat]
      })
    }
    setMarkerVisibility(false);
  }

  return (
    <div>
      <SideBar click={click}
        setClick={(clickInput) => {
          setClick(clickInput);
        }}
      />
      {
        click === 'log' || click === 'dial' ?
          <ParentPage>
            <NavBar />
            <LogPage markerVisibility={markerVisibility} setCall={setCall} />
            <CallCenter />
          </ParentPage>
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
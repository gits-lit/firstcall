import React, {useState} from 'react';

import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import SideBar from '../components/SideBar';

import LogPage from '../pages/LogPage';

import { clearMarkers } from '../components/Map';
import { loadLocation } from '../components/Map/utils.js';

const HomePage = () => {
  const [click, setClick] = useState('log');
  const [markerVisibility, setMarkerVisibility] = useState(true);

  const setCall = (lng, lat) => {
    if (window.map) {
;     // console.log('moving map');
      window.map.easeTo({
        pitch: 60,
        zoom: 16,
        center: [lng, lat],
        bearing: -90,
        duration: 2000,
        essential: true,
        animate: true
      });
      window.map.on('moveend', () => {
        loadLocation(window.map, lng, lat, () => {
          setClick('dial');
        });
      });
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
            <LogPage
              markerVisibility={markerVisibility}
              dial={click=='dial' ? true : false}
              setCall={setCall} />
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
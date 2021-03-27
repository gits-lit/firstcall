import React, { useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";

import DialPage from '../pages/DialPage';
import LogPage from '../pages/LogPage';
import NavBar from '../components/NavBar';
import ParentPage from '../components/ParentPage';
import SideBar from '../components/SideBar';

import { loadLocation, removeLocation } from '../components/Map/utils.js';
import anime from 'animejs';

let callCenterAnimationToDial, dialHeaderAnimationToDial, contactBoxAnimationToDial, deployHelpAnimationToDial, callerInformationAnimationToDial;

const ENDPOINT = 'https://firstcall-snu.herokuapp.com';
const socket = socketIOClient(ENDPOINT);

const HomePage = () => {
  const [click, setClick] = useState('log');
  const [markerVisibility, setMarkerVisibility] = useState(true);

  useEffect(() => {

    socket.emit('connected', {
      user_type: 'responder',
      username: 'Responder'});

    // Animations to ransition from log to dial
    callCenterAnimationToDial = anime({
      targets: '.call-center',
      translateX: -2000,
      display: 'none',
      duration: 2000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine'
    });

    dialHeaderAnimationToDial = anime({
      targets: '.dial-header',
      translateX: -3000,
      duration: 3000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
      begin: function() {
        document.querySelector('.dial-header').style.display = 'block';
      },
    });

    contactBoxAnimationToDial = anime({
      targets: '.contact-box',
      translateY: -1000,
      duration: 2000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
      begin: function() {
        document.querySelector('.contact-box').style.display = 'block';
      },
    });

    deployHelpAnimationToDial = anime({
      targets: '.deploy-help',
      translateY: -1000,
      duration: 2000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
      begin: function() {
        document.querySelector('.deploy-help').style.display = 'block';
      },
    });

    callerInformationAnimationToDial = anime({
      targets: '.caller-information',
      translateY: -1000,
      duration: 2000,
      loop: false,
      autoplay: false,
      easing: 'easeInOutSine',
      begin: function() {
        document.querySelector('.caller-information').style.display = 'block';
      },
    });



  }, []);

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
          if (callCenterAnimationToDial) {
            contactBoxAnimationToDial.play();
            callCenterAnimationToDial.play();
            dialHeaderAnimationToDial.play();
            deployHelpAnimationToDial.play();
            callerInformationAnimationToDial.play();
            setClick('dial');
          }
        });
      });
    }
    setMarkerVisibility(false);
  }

  const setLog = () => {
    if (window.map) {
      removeLocation(window.map, () => {
        setMarkerVisibility(true);
      })
      contactBoxAnimationToDial.reverse();
      callCenterAnimationToDial.reverse();
      dialHeaderAnimationToDial.reverse();
      deployHelpAnimationToDial.reverse();
      callerInformationAnimationToDial.reverse();
    }
  }

  return (
    <div>
      <SideBar click={click}
        setClick={(clickInput) => {
          if (clickInput === 'log') {
            setLog();
          }
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
              setCall={setCall}/>
            <DialPage socket={socket}/>
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
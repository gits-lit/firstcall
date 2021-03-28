import React from 'react';

import camera from '../../assets/camera.svg'
import info from '../../assets/info.svg'
import message from '../../assets/message.svg'
import truck from '../../assets/truck.svg'

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <div
        className={props.click === 'message' ? 'tab selected' : 'tab'}
        onClick={() => {
          props.setClick('message');
        }}
      >
        <img src={message} alt="logo" className="message" />
        <h1>Message</h1>
      </div>
      <div
        className={props.click === 'info' ? 'tab selected' : 'tab'}
        onClick={() => {
          props.setClick('info');
        }}
      >
        <img src={info} alt="logo" className="info" />
        <h1>Set-Info</h1>
      </div>
      <div
        className={props.click === 'help' ? 'tab selected' : 'tab'}
        onClick={() => {
          props.setClick('help');
        }}
      >
        <img src={truck} alt="truck" className="help" />
        <h1>Help ETA</h1>
      </div>
      <div
        className={props.click === 'camear' ? 'tab selected' : 'tab'}
        onClick={() => {
          props.setClick('camera');
        }}
      >
        <img src={camera} alt="camera" className="camera" />
        <h1>Camera</h1>
      </div>
  </div>
  );
}

export default NavBar;

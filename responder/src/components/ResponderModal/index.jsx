import React, { useState , useEffect } from 'react';
import { Button, Modal } from 'antd';
import './style.scss';


// Basically have ResponderModal with the prop visibleModal set to true or false

const ResponderModal = (props) => {
  const COLOR_CODES = {
  info: {
      color: "green"
    }
  };

let remainingPathColor = COLOR_CODES.info.color;
  const [visible, setVisible] = useState(props.visibleModal);
  const [timer, setTimer] = useState(5);

  const startTimer = () =>{
    for( let i=0; i<5; i++){
      setInterval(() => {
        setTimer(timer - 1);
        console.log(timer);
      }, 1000);
    }
  }

  useEffect(() => {
       setVisible(props.visibleModal);
   }, [props.visibleModal])

  const handleAccept = () => {
    setVisible(false);
  };

  if(!visible){
    return null;
  }

  startTimer();
  return (
    <div className="modal">
      <p className="heading">Case Incoming</p>
      <p className="subtext">Auto-Accept will be disabled <br /> if not accepted</p>
      <div className="timer-container">
        <svg className="timer-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g className="timer-circle">
            <circle className="timer-path-elapsed" cx="50" cy="50" r="45" />
            <path
              id="timer-path-remaining"
              stroke-dasharray="283"
              class="timer-path-remaining ${remainingPathColor}"
              d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
              "
              ></path>
          </g>
        </svg>
        <div className="timer-label">
          <p className="count">{timer}</p>
          <p className="subtext">Seconds</p>
        </div>
      </div>
      <button className= "accept-button" onClick={handleAccept}>
        Accept
      </button>
      <p className="pause">Pause Auto-Accept</p>
    </div>
  )
}

export default ResponderModal;

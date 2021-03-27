import { useEffect, useState } from 'react';
import recording from '.../../../public/recording.svg'

import './style.scss';

const RecordingTime = (props) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  return (
    <div className="recording-time">
      <img className="recording-icon" src={recording} alt="recording icon"/>
      <h2>{minutes}:{seconds}</h2>
    </div>
  )
}

export default RecordingTime;

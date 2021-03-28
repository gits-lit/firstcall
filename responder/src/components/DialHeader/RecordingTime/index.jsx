import { useEffect, useState } from 'react';
import recording from '.../../../public/recording.svg'

import './style.scss';

const RecordingTime = (props) => {
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    let min = Math.floor(props.seconds / 60);
    let sec = Math.floor(props.seconds % 60);
    if (min < 10) {
      min = '0' + min.toString();
    }
    setMinutes(min);
    if (sec < 10) {
      sec = '0' + sec.toString();
    }
    setSeconds(sec);
   }, [props.seconds])

  return (
    <div className="recording-time">
      <img className="recording-icon" src={recording} alt="recording icon"/>
      <h2>{minutes}:{seconds}</h2>
    </div>
  )
}

export default RecordingTime;

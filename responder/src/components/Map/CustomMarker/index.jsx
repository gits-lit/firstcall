import { useEffect, useState } from 'react';

import ambulance from '../../../assets/markers/ambulance.svg';
import check from '../../../assets/markers/check.svg';
import eye from '../../../assets/markers/eye.svg'

import './style.scss';

const CustomMarker = (props) => {
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setColor('#F07373');

    switch(props.status) {
      case '1':
        setColor('#FFAC6E');
        setIcon(ambulance);
        setStatus('Help Dispatched');
        break;
      case '2':
        setColor('#689FF2');
        setIcon(ambulance);
        setStatus('Help Ongoing');
        break;
      case '3':
          setColor('#2AEF6D');
          setIcon(check);
          setStatus('Completed');
          break;
      default:
        setColor('#F07373');
        setIcon(eye);
        setStatus('Incoming Call');
    }
  }, [props.status]);

  return (
    <div className="custom-marker">
      <div className="marker-circle-two"></div>
      <div className="marker-box">
        <div>
          <div className="line">
            <div 
              className="marker-circle"
              style={{
                backgroundColor: color
              }}
            />
            <h1>#{props.id.substr(0, 6).toUpperCase()}</h1>
          </div>
          <div className="line">
            <img src={icon} />
            <h2>{status}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomMarker;
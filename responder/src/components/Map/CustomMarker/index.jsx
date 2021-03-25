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
    setStatus(props.status);

    switch(props.status) {
      case 'Help Dispatched':
        setColor('#FFAC6E');
        setIcon(ambulance);
        break;
      case 'Help Ongoing':
        setColor('#689FF2');
        setIcon(ambulance);
        break;
      case 'Completed':
          setColor('#2AEF6D');
          setIcon(check);
          break;
      default:
        setColor('#F07373');
        setIcon(eye);
        setStatus('Incoming Call');
    }
  }, [props.status]);

  return (
    <div className="custom-marker">
      <div className="marker-box">
        <div>
          <div className="line">
            <div 
              className="marker-circle"
              style={{
                backgroundColor: color
              }}
            />
            <h1>#{props.id}</h1>
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
import { useEffect, useState } from 'react';

import InfoTab from './InfoTab';
import VitalsTab from './VitalsTab';
import ImagesTab from './ImagesTab';

import './style.scss';

const CallerInformation = (props) => {
  const [selected, setSelected] = useState('Info');
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    setEmotions([{
      feeling: 'Happy',
      certainty: '97%'
    }, {
      feeling: 'Sad',
      certainty: '95%'
    }, {
      feeling: 'Okay',
      certainty: '50%'
    }])
  }, [])

  return (
    <div className="caller-information">
      <h1>Caller Information</h1>
      <div className="info-select">
        <div 
          className={ selected === 'Info' ? 'select-tab active' : 'select-tab'}
          onClick={() => {
            setSelected('Info');
          }}
        >
          <div className="text">Info</div>
          <div className="background"></div>
        </div>
        <div
          className={ selected === 'Vitals' ? 'select-tab active' : 'select-tab'}
          onClick={() => {
            setSelected('Vitals');
          }}
        >
          <div className="text">Vitals</div>
          <div className="background"></div>
        </div>
        <div
          className={ selected === 'Images' ? 'select-tab active' : 'select-tab'}
          onClick={() => {
            setSelected('Images');
          }}
        >
          <div className="text">Images</div>
          <div className="background"></div>
        </div>
      </div>
      {
        selected === 'Info' ? <InfoTab socket={props.socket}/> :
        selected === 'Vitals' ? <VitalsTab emotions={emotions}/> : 
        <ImagesTab image={props.image} socket={props.socket}/>
      }
    </div>
  )
}

export default CallerInformation;
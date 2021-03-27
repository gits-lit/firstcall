import { useState } from 'react';

import './style.scss';

const CallerInformation = () => {
  const [selected, setSelected] = useState('Info');

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
          className={ selected === 'Images' ? 'select-tab active' : 'select-tab'}
          onClick={() => {
            setSelected('Images');
          }}
        >
          <div className="text">Images</div>
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
      </div>
    </div>
  )
}

export default CallerInformation;
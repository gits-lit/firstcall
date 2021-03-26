import { useState } from 'react';

import './style.scss';

const CallerInformation = () => {
  const [selected, setSelected] = useState('Info');

  return (
    <div className="caller-information">
      <h1>Caller Information</h1>
      <div className="info-select">
        <div className="select-tab">
          Info
        </div>
        <div className="select-tab">
          Vitals
        </div>
        <div className="select-tab">
          Images
        </div>
      </div>
    </div>
  )
}

export default CallerInformation;
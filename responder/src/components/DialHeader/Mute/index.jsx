import { useEffect, useState } from 'react';
import mute from '.../../../public/mute.svg'
import pause from '.../../../public/pause.svg'
import phone from '.../../../public/phone.svg'

import './style.scss';

const Mute = (props) => {
  return (
    <div className="mute">
      <div className="mute-container">
        <img className="mute-icon" src={mute} alt="mute icon"/>
      </div>
      <img className="pause-icon" src={pause} alt="pause icon"/>
      <img className="phone-icon" src={phone} alt="phone icon"/>

    </div>
  )
}

export default Mute;

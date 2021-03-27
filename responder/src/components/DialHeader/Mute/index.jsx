import { useEffect, useState } from 'react';
import mute from '.../../../public/mute.svg'
import pause from '.../../../public/pause.svg'

import './style.scss';

const Mute = (props) => {
  return (
    <div className="mute">
      <div className="icon-container">
        <img className="mute-icon" src={mute} alt="mute icon"/>
        <img className="pause-icon" src={pause} alt="pause icon"/>
      </div>
    </div>
  )
}

export default Mute;

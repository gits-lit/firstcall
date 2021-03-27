import { useEffect, useState } from 'react';
import Mute from './Mute'
import RecordingTime from './RecordingTime'


import './style.scss';

const DialHeader = (props) => {
  return (
    <div className="dial-header">
      <div className="flex-container">
        <h1>
          <div className="status-heading">Ongoing Call</div> | Case #
        </h1>
        <div className="icon-container">
          <Mute/>
          <RecordingTime/>
        </div>
      </div>
    </div>
  )
}

export default DialHeader;

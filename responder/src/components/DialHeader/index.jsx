import { useEffect, useState } from 'react';
import Mute from './Mute'

import './style.scss';

const DialHeader = (props) => {
  return (
    <div className="dial-header">
      <h1>
        <div className="status-heading">Ongoing Call</div> | Case #
      </h1>
        <Mute/>
    </div>
  )
}

export default DialHeader;

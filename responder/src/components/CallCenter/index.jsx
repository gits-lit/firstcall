import React from 'react';
import { Switch } from 'antd';

import './style.scss';

import Log from '../Log';

const NavBar = () => {

  const callStatus = {
    'status':'Ongoing',
    'caseId':'ADS31',
    'time':'3:25PM',
    'location':'3112 Sunset Blvdsadsajkdhsak'
  }

  return (
    <div className="call-center">
      <div className="call-center-header">
        <h1 className="center-name">Call Center</h1>
        <div className="toggle-button">
          <Switch defaultChecked />
          <h2>Auto-Accept cases</h2>
        </div>
      </div>
      <Log status={callStatus.status} caseId={callStatus.caseId}
      time={callStatus.time} location={callStatus.location}/>
    </div>
  )
}

export default NavBar;

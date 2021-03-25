import React from 'react';
import './style.scss';

import Log from '../Log';

const NavBar = () => {

  const callStatus = {
    'status':'New',
    'caseId':'ADS31',
    'time':'3:25PM',
    'location':'3112 Sunset Blvdsadsajkdhsak'
  }

  return (
    <div className="call-center">
      <h1 className="center-name">Call Center</h1>
      <Log status={callStatus.status} caseId={callStatus.caseId}
      time={callStatus.time} location={callStatus.location}/>
    </div>
  )
}

export default NavBar;

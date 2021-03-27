import React, { useState } from 'react';

import IncidentDropdown from '../IncidentDropdown'
import './style.scss';

const InfoTab = (props) => {
  return (
    <div className="case-dropdown">
      <IncidentDropdown />
    </div>
  )
}

export default InfoTab;
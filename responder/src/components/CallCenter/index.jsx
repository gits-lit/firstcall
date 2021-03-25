import React, { useState } from 'react';
import { Dropdown, Menu, Switch } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './style.scss';

import CaseFilter from '../CaseFilter';
import Log from '../Log';
import SearchBar from '../SearchBar';

const NavBar = () => {

  const [option, setOptions] = useState('');

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
      <SearchBar />
      <div className="status-options">
        <div>
          
        </div>
        <CaseFilter />
      </div>
      <Log status={callStatus.status} caseId={callStatus.caseId}
      time={callStatus.time} location={callStatus.location}/>
    </div>
  )
}

export default NavBar;

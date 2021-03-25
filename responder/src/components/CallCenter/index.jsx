import React, { useState } from 'react';
import { Dropdown, Menu, Switch } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './style.scss';

import CaseFilter from './CaseFilter';
import Log from './Log';
import SearchBar from './SearchBar';

const CallCenter = (props) => {

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
      <div className="logs">
      {props.data.map(user => {
          console.log(user);
          const date = new Date(user.startDate)
          const minutes = date.getMinutes();
          const hours = date.getHours() % 12;
          const ampm = date.getHours() > 11 ? 'PM': 'AM';
          return (
            <Log status={user.status} caseId={user.caseId}
            time={`${hours}:${minutes} ${ampm}`} location={user.address}/>
          )
        })}
      </div>
    </div>
  )
}

export default CallCenter;

import React from 'react';
import StatusOptions from './StatusOptions'
import logo from '.../../../public/logo.svg'

import './style.scss';

const TopBar = (props) => {
  return (
    <div className="top-bar">
      <img className="logo" src={logo} alt="logo pin"/>
      <StatusOptions data={{}}/>
    </div>
  )
}

export default TopBar;

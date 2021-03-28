import React from 'react';
import StatusOptions from './StatusOptions'
import logo from '.../../../public/logo.svg'

import './style.scss';

const NavBar = (props) => {
  return (
    <div className="nav-bar">
      <img className="logo" src={logo} alt="logo pin"/>
      <StatusOptions data={{}}/>
    </div>
  )
}

export default NavBar;

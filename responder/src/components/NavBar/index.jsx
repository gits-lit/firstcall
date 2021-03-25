import React from 'react';
import './style.scss';

import SearchBar from './SearchBar';
import logo from '.../../../public/logo.svg'
import gear from '.../../../public/gear.svg'



const NavBar = () => {
  return (
    <div className="nav-bar">
      <img className="logo" src={logo} alt="logo pin"/>
      <SearchBar/>
      <img className="gear" src={gear} alt="logo pin"/>
    </div>
  )
}

export default NavBar;

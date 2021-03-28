import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import arrow from '../../../assets/arrow.svg'
import './style.scss';

const IncidentDropdown = (props) => {
  const onClick = ({ key }) => {
    setCurrentSelected(key);
  };

  const [currentSelected, setCurrentSelected] = useState('');
/*
            { currentSelected !== "Bomb Threat" ? <Menu.Item key="Bomb Threat">Bomb Threat</Menu.Item> : null }
            { currentSelected !== "Chemical Spill" ? <Menu.Item key="Chemical Spill">Chemical Spill</Menu.Item> : null }
            { currentSelected !== "Distress" ? <Menu.Item key="Distress">Distress</Menu.Item> : null }
            { currentSelected !== "Environmental" ? <Menu.Item key="Environmental">Environmental</Menu.Item> : null }
            { currentSelected !== "Property damage" ? <Menu.Item key="Property damage">Property damage</Menu.Item> : null }
            { currentSelected !== "Psychological" ? <Menu.Item key="Psychological">Psychological</Menu.Item> : null }
            { currentSelected !== "Sexual Violence" ? <Menu.Item key="Sexual Violence">Sexual Violence</Menu.Item> : null }
            { currentSelected !== "Suspicious Letter or Package" ? <Menu.Item key="Suspicious Letter or Package">Suspicious Letter or Package</Menu.Item> : null }
            { currentSelected !== "Robbery" ? <Menu.Item key="Robbery">Robbery</Menu.Item> : null }
            { currentSelected !== "Vechine" ? <Menu.Item key="Vechine">Vechine</Menu.Item> : null }
            { currentSelected !== "Weather Event" ? <Menu.Item key="Weather Event">Weather Event</Menu.Item> : null }*/
  return (
    <div className="incident-dropdown">
      <h1 className="incident-header">Incident Type</h1>
      <Dropdown className="incident-filter"
        overlay={
          <Menu onClick={onClick} >
            { currentSelected !== "Criminal" ? <Menu.Item key="Criminal">Criminal</Menu.Item> : null }
            { currentSelected !== "Fire" ? <Menu.Item key="Fire">Fire</Menu.Item> : null }
            { currentSelected !== "Medical" ? <Menu.Item key="Medical">Medical</Menu.Item> : null }
            { currentSelected !== "Other" ? <Menu.Item key="Other">Other</Menu.Item> : null }
          </Menu>
        }>
        <a className="ant-dropdown-link" 
          onClick={ e => 
            e.preventDefault()
          }>
          {currentSelected} <DownOutlined />
        </a>
      </Dropdown>
      <img className="arrow-down" src={arrow} alt="arrow"/>
    </div>
  )
}

export default IncidentDropdown;
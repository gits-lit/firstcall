import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import arrow from '../../../assets/arrow.svg'
import './style.scss';

const CaseFilter = (props) => {
  const onClick = ({ key }) => {
    setCurrentSelected(key);
    props.setFilter(key);
  };

  const [currentSelected, setCurrentSelected] = useState(props.filter);

  return (
    <div className="case-dropdown">
      <Dropdown className="case-filter"
        overlay={
          <Menu onClick={onClick} >
            { currentSelected !== "All Cases" ? <Menu.Item key="All Cases">All Cases</Menu.Item> : null }
            { currentSelected !== "New" ? <Menu.Item key="New">New</Menu.Item> : null }
            { currentSelected !== "Ongoing" ? <Menu.Item key="Ongoing">Ongoing</Menu.Item> : null }
            { currentSelected !== "Completed" ? <Menu.Item key="Completed">Completed</Menu.Item> : null }
          </Menu>
        }>
        <a className="ant-dropdown-link" 
          onClick={ e => 
            e.preventDefault()
          }>
          {currentSelected} <DownOutlined />
        </a>
      </Dropdown>
      <img className="arrow" src={arrow} alt="arrow"/>
    </div>
  )
}

export default CaseFilter;

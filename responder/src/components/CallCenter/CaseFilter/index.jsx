import React from 'react';
import { Dropdown, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './style.scss';

const CaseFilter = (props) => {
  const onClick = ({ key }) => {
    console.log(key);
    message.info(`Click on item ${key}`);
  };

  return (
    <Dropdown className="case-filter"
      overlay={
        <Menu onClick={onClick}>
          <Menu.Item key="0">
            New
          </Menu.Item>
          <Menu.Item key="1">
            Ongoing
          </Menu.Item>
          <Menu.Item key="3">Completed</Menu.Item>
        </Menu>
      }>
      <a className="ant-dropdown-link" 
        onClick={ e => 
          e.preventDefault()
        }>
        All Cases <DownOutlined />
      </a>
    </Dropdown>
  )
}

export default CaseFilter;

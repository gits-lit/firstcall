import React, { useState } from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import arrow from '../../../../assets/arrow.svg';
import './style.scss';

const LanguageDropDown = (props) => {
  const twoLetterLanguages = {
    "Spanish":"ES",
    "Mandarin":"ZN",
    "Hindi":"HI",
    "French":"FR",
    "Russian":"RU",
    "Portugese":"PT",
    "Japanese":"JA",
    "Bengali":"BN",
    "Vietnamese":"VI",
    "Tagalog":"TL",
    "Korean":"KO"
  };
  const onClick = ({ key }) => {
    setCurrentSelected(key);
    props.setLanguage(twoLetterLanguages[key]);
  };
  const [currentSelected, setCurrentSelected] = useState('');

  return (
    <div className="language-dropdown">
      <Dropdown className="language-filter"
        overlay={
          <Menu onClick={onClick} >
            { currentSelected !== "Spanish" ? <Menu.Item key="Spanish" >Spanish</Menu.Item> : null }
            { currentSelected !== "Mandarin" ? <Menu.Item key="Mandarin" >Mandarin Chinese</Menu.Item> : null }
            { currentSelected !== "Hindi" ? <Menu.Item key="Hindi" >Hindi</Menu.Item> : null }
            { currentSelected !== "French" ? <Menu.Item key="French" >French</Menu.Item> : null }
            { currentSelected !== "Russian" ? <Menu.Item key="Russian" >Russian</Menu.Item> : null }
            { currentSelected !== "Portuguese" ? <Menu.Item key="Portuguese" >Portuguese</Menu.Item> : null }
            { currentSelected !== "Japanese" ? <Menu.Item key="Japanese" >Japanese</Menu.Item> : null }
            { currentSelected !== "Bengali" ? <Menu.Item key="Bengali"  >Bengali</Menu.Item> : null }
            { currentSelected !== "Vietnamese" ? <Menu.Item key="Vietnamese" >Vietnamese</Menu.Item> : null }
            { currentSelected !== "Tagalog" ? <Menu.Item key="Tagalog" >Tagalog</Menu.Item> : null }
            { currentSelected !== "Korean" ? <Menu.Item key="Korean" >Korean</Menu.Item> : null }
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

export default LanguageDropDown;
import React, { useState } from 'react';
import { Switch } from 'antd';

import arrow from '../../assets/arrow.svg'
import LanguageDropdown from './LanguageDropdown'
import messagebutton from '../../assets/message-button.png';

import './style.scss'

const Messages = (props) => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('EN');

  const [messageData, setMessageData] = useState([{
    sender: 'caller',
    message: "Please help! A man broke into my house!",
    time: '3:00PM'
  },
  {
    sender: 'responder',
    message: "I'll send help right away. Where are you right now?",
    time: '3:01PM' 
  }]);

  const sendMessage = () => {
    if (value !== '') {
      const tempMessageData = [...messageData, {
        sender: 'responder',
        message: value,
        time: '3:07'
      }]
      setMessageData(tempMessageData);
      setValue('')
    }
  }
  
  return (
    <div className="sub-container">
      <div className="header">
        <h1 className="title">Messages</h1>
        <img src={arrow} alt="arrow" className="arrow" />
      </div>
      <div className="messenger">
        <div className="translate-tab">
          <div className="languagues">
            <LanguageDropdown setLanguage={(languageInput) => {
              setLanguage(languageInput);
            }}/>
            <h1>{language}</h1>
          </div>
          <div className="toggle">
            <Switch defaultChecked />
            <h1>Translate</h1>
          </div>
        </div>
        <div className="all-messages">
          {messageData.map((message) => {
            if (message.sender === 'responder') {
              return (
                <div className='responder message'>
                  <b>{message.time}</b>  {message.message}
                </div>
              )
            } else {
              return (
                <div className='caller message'>
                  <b>{message.time}</b>{message.message}
                </div>
              )
            }
          })}
        <div className="input-message">
          <input onChange={(e) => {
            setValue(e.target.value);
          }} value={value}/>
          <img src={messagebutton} onClick={sendMessage}/>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Messages;
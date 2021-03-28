import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';

import arrow from '../../assets/arrow.svg'
import LanguageDropdown from './LanguageDropdown'
import messagebutton from '../../assets/message-button.png';

import './style.scss'

const Messages = (props) => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('EN');
  const [translate, setTranslate] = useState(false);

  const [messageData, setMessageData] = useState([{
    sender: 'responder',
    message: "Please help! A man broke into my house!",
    time: '8:00PM'
  },
  {
    sender: 'caller',
    message: "I'll send help right away. Where are you right now?",
    time: '8:01PM' 
  }]);

  const sendMessage = () => {
    if (value !== '') {
      const tempMessageData = [...messageData, {
        sender: 'responder',
        message: value,
        time: '8:06PM'
      }];
      props.socket.emit('chatMessage', {
        message: value,
        user_type: 'user'
      })
      setMessageData(tempMessageData);
      setValue('')
    }
  }

  useEffect(() => {
    props.socket.emit('joinRoom', 1);
    props.socket.removeListener('message');
    props.socket.on('message', async (data) => {
      if (!translate) {
        console.log('nto translating')
        setMessageData(prevState => [...prevState, {
          sender: 'caller',
          message: data.text,
          time: '8:06PM'
        }]);
      } else {
        console.log('translating');
        const response = await fetch(`https://firstcall-snu.herokuapp.com/api/translate?text=${data.text}&to=${language.toLowerCase()}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      
        const translateData = await response.json();

        setMessageData(prevState => [...prevState, {
          sender: 'caller',
          message: translateData.text,
          time: '8:06PM'
        }]);
      }

    });
  }, [translate, language]);

  const toggleTranslate = async(checked) => {
    console.log(checked);
    setTranslate(checked);

    if (checked === true) {
      console.log('let');
      const tempMessageData = []
      for (let i = 0; i < messageData.length ; i ++) {
        const currentData = messageData[i];
        const response = await fetch(`https://firstcall-snu.herokuapp.com/api/translate?text=${currentData.message}&to=${language.toLowerCase()}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      
        console.log('here');
        console.log(currentData);
        const translatedData = await response.json();
        tempMessageData.push({
          sender: currentData.sender,
          message: translatedData.text,
          time: currentData.time
        })
      }
      console.log(tempMessageData);
      setMessageData(prevState => 
        tempMessageData
      )
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
            <Switch onChange={toggleTranslate} />
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
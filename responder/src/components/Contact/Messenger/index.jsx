import { useState, useEffect } from 'react';
import { Switch } from 'antd';

import LanguageDropdown from './LanguageDropdown'
import messagebutton from '../../../assets/message-button.png';

import './style.scss';

const Messenger = (props) => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('EN');
  const [translate, setTranslate] = useState(false);

  const [messageData, setMessageData] = useState([]);

  const sendMessage = () => {
    if (value !== '') {
      const tempMessageData = [...messageData, {
        sender: 'responder',
        message: value,
        time: '7:14PM'
      }]
      props.socket.emit('chatMessage', {
        user_type: 'responder',
        message: value,
        uid: 1
      })
      setMessageData(tempMessageData);
      setValue('');
    }
  }

  useEffect(() => {
    props.socket.removeListener('message');
    props.socket.on('message', async (data) => {
      if (!translate) {
        console.log('nto translating')
        setMessageData(prevState => [...prevState, {
          sender: 'caller',
          message: data.text,
          time: '7:14PM'
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

  const toggleTranslate = async (checked) => {
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
    <div className="messenger">
      <div className="translate-tab">
          <div className="languagues">
            <LanguageDropdown setLanguage={(languageInput) => {
              setLanguage(languageInput);
            }}/>
            <h1>{language}</h1>
          </div>
          <div className="toggle">
            <Switch onChange={toggleTranslate}/>
            <h1>Translate</h1>
          </div>
        </div>
      <div className="messages">
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
    </div>
      <div className="input-message">
        <input onChange={(e) => {
          setValue(e.target.value);
        }} value={value}/>
        <img src={messagebutton} onClick={sendMessage}/>
      </div>
    </div>
  )

}

export default Messenger;
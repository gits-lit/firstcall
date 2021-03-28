import { useState } from 'react';

import messagebutton from '../../../assets/message-button.png';

import './style.scss';

const Messenger = () => {
  const [value, setValue] = useState('');

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
    <div className="messenger">
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
import { useState } from 'react';

import './style.scss';
import Messenger from './Messenger';

const Contact = () => {
  const [transcript, setTranscript] = useState(false);

  return (
    <div className="contact-box">
      <div
        className={transcript ? 'contact-header' : 'contact-header active'}
        onClick={() => {
          setTranscript(false);
        }}>
        <h1>Messages</h1>
      </div>
      <div
        className={transcript ? 'contact-header active' : 'contact-header'}
        onClick={() => {
          setTranscript(true);
        }}>
        <h1>Transcript</h1>
      </div>
      {transcript ? null : <Messenger />}
    </div>
  )
}

export default Contact;
import { useState } from 'react';

import './style.scss';

const Contact = () => {
  const [transcript, setTranscript] = useState(true);

  return (
    <div className="contact-box">
      <div
        className={transcript ? 'contact-header active' : 'contact-header'}
        onClick={() => {
          setTranscript(true);
        }}>
        <h1>Transcript</h1>
      </div>
      <div
        className={transcript ? 'contact-header' : 'contact-header active'}
        onClick={() => {
          setTranscript(false);
        }}>
        <h1>Messages</h1>
      </div>
    </div>
  )
}

export default Contact;
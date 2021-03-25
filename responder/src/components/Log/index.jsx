import React, { useEffect, useState } from 'react';
import { Button } from 'antd';

import './style.scss';

const Log = (props) => {
  const [borderColor, setBorderColor] = useState('');
  const [color, setColor] = useState('');
  const [condition, setCondition] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    setBorderColor('#FA7B92');
    setColor('#FA7B92');
    setCondition('Accept');
    setStatus(props.status);

    switch(props.status) {
      case 'Ongoing':
        setBorderColor('#689FF2');
        setColor('#DFDFDF');
        setCondition('View');
        break;
      case 'Completed':
        setBorderColor('#2AEF6D');
        setColor('#DFDFDF');
        setCondition('View');
        break;
      default:
        setBorderColor('#FA7B92');
        setColor('#FA7B92');
        setCondition('Accept');
    }
  }, [props.status]);

  return (
    <div className="log-status"
      style={{
        border: `1px solid ${color}`
      }}>
      <div className="log-line"
        style={{
          backgroundColor: `${borderColor}`
        }}>
      </div>
      <div className="entry call-status">
        <div>
          <h1>Status</h1>
          <h2>{status}</h2>
        </div>
      </div>
      <div className="entry call-case-id">
        <div>
          <h1>Case Id</h1>
          <h2>#{props.caseId}</h2>
        </div>
      </div>
      <div className="entry call-time">
        <div>
          <h1>Time</h1>
          <h2>{props.time}</h2>
        </div>
      </div>
      <div className="entry call-location">
        <div>
          <h1>Location</h1>
          <h2>{props.location}</h2>
        </div>
      </div>
      {
        condition === 'Accept' ? 
          <Button className="accept" size="large" 
          style={{
            backgroundColor: '#40EB5B',
            border: 'none',
            color: '#FFFFFF'
          }}>
            {condition}
        </Button> :
        <Button className="accept" size="large" 
        style={{
          backgroundColor: '#FFFFFF',
          border: `1px solid ${color}`,
          color: '#333333'
        }}>
          {condition}
      </Button>
      }
    </div>
  )
}

export default Log;

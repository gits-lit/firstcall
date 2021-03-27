import React, { useEffect, useState } from 'react';

import './style.scss';

const RouteLog = (props) => {
  const [color, setColor] = useState('');

  useEffect(() => {
    setColor('#FA7B92');

    switch(props.status) {
      case 'Enroute':
        setColor('#689FF2');
        break;
      case 'On-Site':
        setColor('#2AEF6D');
        break;
      default:
        setColor('#FA7B92');
    }
  }, [props.status]);

  return (
    <div className="route-status"
      style={{
        border: `1px solid ${color}`
      }}>
      <div className="route-line"
        style={{
          backgroundColor: `${color}`
        }}>
      </div>
      <div className="entry route-type">
        <div>
          <h1>Type</h1>
          <h2>{props.type || 'Ambulance'}</h2>
        </div>
      </div>
      <div className="entry route-unitId">
        <div>
          <h1>Unit Id</h1>
          <h2>#DPQO32</h2> 
          {/* <h2>#{props.unitId.substr(0, 6).toUpperCase() || 'N/A'}</h2> */}
        </div>
      </div>
      <div className="entry route-time">
        <div>
          <h1>ETA</h1>
          <h2>{props.eta || '-:--PM'}</h2>
        </div>
      </div>
      <div className="entry route-dispatch">
        <div>
          <h1>Dispatch</h1>
          <h2>{props.dispatch || 'N/A'}</h2>
        </div>
      </div>
    </div>
  )
}

export default RouteLog;

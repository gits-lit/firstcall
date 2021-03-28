import React, { useEffect, useState} from 'react';
import './style.scss';

const StatusOptions = (props) => {
  const [onsiteCount, setOnsite] = useState(0);
  const [requestedCount, setRequestedCount] = useState(0);
  const [enrouteCount, setEnrouteCount] = useState(0);

  useEffect(() => {
    let onsiteStatus = 0;
    let requestedStatus = 0;
    let enrouteStatus = 0;

    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].status === '0') {
        requestedStatus += 1;
      } else if (props.data[i].status === '1' || props.data[i].status === '2') {
        enrouteStatus += 1;
      } else {
        onsiteStatus += 1;
      }
    }
    setOnsite(onsiteStatus);
    setRequestedCount(requestedStatus);
    setEnrouteCount(enrouteStatus);
  }, [props.data]);

  return (
    <div className="status-options">
      <div className="option-num">
        <div className="option">
          <div className="requested-circle"></div>
          <div className="option-description"><span>{requestedCount}</span> Requested </div>
        </div>
        <div className="option">
          <div className="enroute-circle"></div>
          <div className="option-description"><span>{enrouteCount}</span> Enroute </div>
        </div>
        <div className="option">
          <div className="onsite-circle"></div>
          <div className="option-description"><span>{onsiteCount}</span> OnSite </div>
        </div>
      </div>
    </div>
  )
}

export default StatusOptions;

import React from 'react';
import './style.scss';

const StatusOptions = (props) => {
  const [completedCount, setCompleted] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  
  useEffect(() => {
    let completedStatus = 0;
    let newStatus = 0;
    let ongoingStatus = 0;

    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].status === '0') {
        newStatus += 1;
      } else if (props.data[i].status === '1' || props.data[i].status === '2') {
        ongoingStatus += 1;
      } else {
        completedStatus += 1;
      }
    }
    setCompleted(completedStatus);
    setNewCount(newStatus);
    setOngoingCount(ongoingStatus);
  }, [props.data]);

  return (
    <div className="status-options">
      <div className="option-num">
        <div className="option">
          <div className="new-circle"></div>
          <div className="option-description"><span>{newCount}</span> New </div>
        </div>
        <div className="option">
          <div className="ongoing-circle"></div>
          <div className="option-description"><span>{ongoingCount}</span> Ongoing </div>
        </div>
        <div className="option">
          <div className="completed-circle"></div>
          <div className="option-description"><span>{completedCount}</span> Completed </div>
        </div>
      </div>
  )
}

export default NavBar;

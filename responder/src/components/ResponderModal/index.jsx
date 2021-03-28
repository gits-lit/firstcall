import React, { useState , useEffect } from 'react';
import { Button, Modal, Progress } from 'antd';
import './style.scss';


// Basically have ResponderModal with the prop visibleModal set to true or false
let interval;
const ResponderModal = (props) => {
  const [visible, setVisible] = useState(props.visibleModal);
  const [seconds, setSeconds] = useState(5);

  useEffect(() => {
       setVisible(props.visibleModal);
       setSeconds(props.seconds);
       console.log(props.seconds);
   }, [props.visibleModal])

   useEffect(() => {
    interval = setInterval(() => {
      setSeconds(prevState => prevState - 1);
    }, 1000);
   }, [props.visibleModal])

   useEffect(() => {
    if (seconds <= 0 && interval) {
      clearInterval(interval);
      props.setIsModalVisible(false);
      props.setToggleStatus(false);
    }
   }, [seconds])

  return (
    <Modal className="modal" visible={visible} closable={false} footer={null}>
      <div>
        <h1>Case Incoming</h1>
        <h2>Auto-Accept will be disabled if not accepted</h2>
      </div>
      <div className="time-body">
        <Progress percent={(seconds/5) * 100} showInfo={false} 
          strokeColor="#F99791" type="circle" 
          strokeLinecap="square" strokeWidth={10} 
          width={200} trailColor="white"
        />
        <div className="time-limit">
          <h1><p className="time">{seconds}</p><p>Seconds</p></h1>
        </div>

      </div>
      <div>
        <Button className="btn" size="large"
          onClick={() => {
            props.setIsModalVisible(false);
            props.setToggleStatus(true);
          }}
        >
          Accept
        </Button>
        <h3 className="pause" 
          onClick={() => {
            props.setIsModalVisible(false);
            props.setToggleStatus(false);
          }}> 
          Pause Auto-Accept
        </h3>

      </div>
    </Modal>
  )
}

export default ResponderModal;

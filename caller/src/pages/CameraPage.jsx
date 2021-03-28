import { useState, useEffect } from 'react';

import Camera from '../components/Camera';

const CameraPage = (props) => {
    const [BPM, setBPM] = useState('N/A')

    useEffect(() => {
      props.socket.emit('joinChannel', 1)
      props.socket.on('data', data => {
        console.log(data);
        setBPM(data.value);
      })
    }, []);

    return (
    <div className="CameraPage">
      <Camera BPM={BPM} setBPM={setBPM} setClick={props.setClick} socket={props.socket} />
    </div>
  );
};

export default CameraPage;

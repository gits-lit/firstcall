import { useState } from 'react';

import Camera from '../components/Camera';

const CameraPage = (props) => {
    const [BPM, setBPM] = useState('N/A')

    return (
    <div className="CameraPage">
      <Camera BPM={BPM} setBPM={setBPM} setClick={props.setClick} />
    </div>
  );
};

export default CameraPage;

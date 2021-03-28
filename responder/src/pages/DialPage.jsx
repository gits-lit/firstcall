import React, { useEffect, useState } from 'react';

import CallerInformation from '../components/CallerInformation';
import Contact from '../components/Contact';
import DialHeader from '../components/DialHeader';
import DeployHelp from '../components/DeployHelp';
import Camera from '../components/Camera';
import Image from '../components/Image';

const DialPage = (props) => {
  const [responderData, setResponderData] = useState([]);
  const [image, setImage] = useState([]);
  const [emotions, setEmotions] = useState([]);

  const getAllResponders = async () => {
    const response = await fetch('http://firstcall-snu.herokuapp.com/api/responders', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });  
  
    const data = await response.json();
    if (!data) throw new Error('Empty response from server');
    if (data.error) throw new Error(data.error.message);
    if (!data.success) console.error('Error from server');

    setResponderData(data.responders);
  }

  useEffect(() => {
    getAllResponders();
  }, [])

  return (
    <div>
      <Camera setEmotions={setEmotions} socket={props.socket} startTakingInCalls={props.startTakingInCalls}/>
      <DialHeader />
      <Contact socket={props.socket}/>
      <DeployHelp responderData={responderData}/>
      <CallerInformation emotions={emotions} image={image} socket={props.socket}/>
      <Image setImage={setImage} socket={props.socket}/>
    </div>
  )
}

export default DialPage;
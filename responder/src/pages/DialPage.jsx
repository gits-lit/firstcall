import React, { useEffect, useState } from 'react';

import CallerInformation from '../components/CallerInformation';
import Contact from '../components/Contact';
import DialHeader from '../components/DialHeader';
import DeployHelp from '../components/DeployHelp';
import Camera from '../components/Camera';

const DialPage = (props) => {
  const [responderData, setResponderData] = useState([]);

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
      <Camera socket={props.socket}/>
      <DialHeader />
      <Contact />
      <DeployHelp responderData={responderData}/>
      <CallerInformation />
    </div>
  )
}

export default DialPage;
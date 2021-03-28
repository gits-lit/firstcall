import React, { useEffect, useState } from 'react';

import Map from '../components/Map';
import CallCenter from '../components/CallCenter';

const LogPage = (props) => {
  const [data, setData] = useState([]);

  const getAllUsers = async () => {
    const response = await fetch('https://firstcall-snu.herokuapp.com/api/users', {
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

    setData(data.users);
  }

  useEffect(() => {
    getAllUsers();
  }, [])


  return (
    <div>
      <Map
        markerVisibility={props.markerVisibility}
        setCall={props.setCall}
        dial={props.dial}
        data={data}/>
      <CallCenter data={data} setStartTakingInCalls={props.setStartTakingInCalls}/>
    </div>
  )
}

export default LogPage;
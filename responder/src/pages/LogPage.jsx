import React, { useEffect, useState } from 'react';

import Map from '../components/Map';
import CallCenter from '../components/CallCenter';

const LogPage = (props) => {
  const [data, setData] = useState([]);
  const [accepting, setAccepting] = useState(false);

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
        accepting={accepting}
        markerVisibility={props.markerVisibility}
        setCall={props.setCall}
        dial={props.dial}
        data={data}/>
      <CallCenter setCall={props.setCall} data={data} accepting={accepting} setAccepting={setAccepting} setStartTakingInCalls={props.setStartTakingInCalls}/>
    </div>
  )
}

export default LogPage;
import React, { useEffect, useState } from 'react';

import CallerInformation from '../components/CallerInformation';
import Contact from '../components/Contact';
import DialHeader from '../components/DialHeader';
import DeployHelp from '../components/DeployHelp';

const DialPage = (props) => {
  const [data, setData] = useState([]);

  // const getAllResponders = async () => {
  //   const response = await fetch('https://firstcall-snu.herokuapp.com/api/responders', {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     }
  //   });  
  
  //   const data = await response.json();
  //   if (!data) throw new Error('Empty response from server');
  //   if (data.error) throw new Error(data.error.message);
  //   if (!data.success) console.error('Error from server');

  //   setData(data.users);
  // }

  // useEffect(() => {
  //   getAllResponders();
  // }, [])


  return (
    <div>
      <DialHeader />
      <Contact />
      <DeployHelp data={data}/>
      <CallerInformation />
    </div>
  )
}

export default DialPage;
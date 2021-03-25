import React from 'react';
import Map from '../components/Map';

const LogPage = (props) => {
  return (
    <div>
      <Map setCall={props.setCall}/>
    </div>
  )
}

export default LogPage;
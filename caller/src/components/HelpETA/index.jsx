import React from 'react';

import RouteLog from './RouteLog'


import './style.scss'

const HelpETA = (props) => {
  //temp route log
  const tempRequested = [{
    status:'Requested',
    unitId:'DPQO32',
    type:'Police',
    eta:'-:--PM',
    dispatch:'2:12PM'
  },
  {
    status:'Requested',
    unitId:'DPQO32',
    type:'Ambulance',
    eta:'2:14PM',
    dispatch:'2:11PM'
  },
  {
    status:'Requested',
    unitId:'DPQO32',
    type:'Police',
    eta:'2:14',
    dispatch:'2:11PM'
  },
  {
    status:'Requested',
    unitId:'DPQO32',
    type:'Police',
    eta:'Arrived',
    dispatch:'2:12PM'
  }]
  return (
    <div className="help-container">
      <div>
      <h1 className="help-header">Help ETA</h1>
      </div>
      <div className="route-logs">
        <h1 className="route-status-header">Requested</h1>
        { tempRequested.map(route => {
          const date = new Date(route.ETA)
          const minutes = date.getMinutes();
          const hours = date.getHours() % 12;
          const ampm = date.getHours() > 11 ? 'PM': 'AM';
          const dateDispatch = new Date(route.ETA)
          const minutesDispatch = dateDispatch.getMinutes();
          const hoursDispatch = dateDispatch.getHours() % 12;
          const ampmDispatch = dateDispatch.getHours() > 11 ? 'PM': 'AM';
          return (
            <RouteLog dispatch={`${hoursDispatch}:${minutesDispatch} ${ampmDispatch}`}
              eta={`${hours}:${minutes} ${ampm}`} type={route.type}
              status={route.status} unitId={route.unitId} />
          )
        })}
        <h1 className="route-status-header">Enroute</h1>
        { tempRequested.map(route => {
          const date = new Date(route.ETA)
          const minutes = date.getMinutes();
          const hours = date.getHours() % 12;
          const ampm = date.getHours() > 11 ? 'PM': 'AM';
          const dateDispatch = new Date(route.ETA)
          const minutesDispatch = dateDispatch.getMinutes();
          const hoursDispatch = dateDispatch.getHours() % 12;
          const ampmDispatch = dateDispatch.getHours() > 11 ? 'PM': 'AM';
          return (
            <RouteLog dispatch={`${hoursDispatch}:${minutesDispatch} ${ampmDispatch}`}
              eta={`${hours}:${minutes} ${ampm}`} type={route.type}
              status={route.status} unitId={route.unitId} />
          )
        })}
        <h1 className="route-status-header">On-Sight</h1>
        { tempRequested.map(route => {
          const date = new Date(route.ETA)
          const minutes = date.getMinutes();
          const hours = date.getHours() % 12;
          const ampm = date.getHours() > 11 ? 'PM': 'AM';
          const dateDispatch = new Date(route.ETA)
          const minutesDispatch = dateDispatch.getMinutes();
          const hoursDispatch = dateDispatch.getHours() % 12;
          const ampmDispatch = dateDispatch.getHours() > 11 ? 'PM': 'AM';
          return (
            <RouteLog dispatch={`${hoursDispatch}:${minutesDispatch} ${ampmDispatch}`}
              eta={`${hours}:${minutes} ${ampm}`} type={route.type}
              status={route.status} unitId={route.unitId} />
          )
        })}
      </div>
    </div>
  )
}

export default HelpETA;
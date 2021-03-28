import React, { useEffect, useState } from 'react';

import HelpCarousel from './HelpCarousel';
import RouteLog from './RouteLog';
import SearchBar from '../CallCenter/SearchBar';

import './style.scss';

const DeployHelp = (props) => {
  const [searchUnit, setSearchUnit] = useState('');

  //temp route log
  /*const tempRequested = [{
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
  }]*/
  const tempRequested = [];

  return (
    <div className="deploy-help">
      <div className="route-options">
        <h1 className="deploy-header">Deploy Help</h1>
        <div className="option-num">
          <div className="requested-option">
            <div className="requested-circle"></div>
            <div className="option-description"><h1>{0}</h1><span>Requested</span></div>
          </div>
          <div className="option">
            <div className="enroute-circle"></div>
            <div className="option-description"><h1>{0}</h1><span>Enroute</span> </div>
          </div>
          <div className="option">
            <div className="onsight-circle"></div>
            <div className="option-description"><h1>{0}</h1><span>On-Site</span></div>
          </div>
        </div>
      </div>
      <SearchBar name="for Unit"
        setSearchId={(searchUnitInput) => {
          setSearchUnit(searchUnitInput);
        }}
      />
      <HelpCarousel unit={props.responderData} searchValue={searchUnit}/>
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

export default DeployHelp;
import React, { useEffect, useState, useRef } from 'react';
import { Switch } from 'antd';
import anime from 'animejs';

import './style.scss';

import CaseFilter from './CaseFilter';
import Log from './Log';
import SearchBar from './SearchBar';

const CallCenter = (props) => {
const animationRef = React.useRef(null);
  useEffect(() => {
    animationRef.current = anime({
      targets: '.log-status',
      opacity: '1',
      delay: anime.stagger(200, {start: 0}),
      translateY: [{value: 0, easing: 'easeInCubic'}, {value: -25, easing: 'easeOutCubic'}],
      direction: 'alternate',
      easing: 'easeInExpo',
      duration: 200 * props.data.length,
      loop: false,
      autoplay: true
  });   
  }, [props.data])

  return (
    <div className="call-center">
      <div className="call-center-header">
        <h1 className="center-name">Call Center</h1>
        <div className="toggle-button">
          <Switch defaultChecked />
          <h2>Auto-Accept cases</h2>
        </div>
      </div>
      <SearchBar />
      <div className="status-options">
        <div className="option-num">
          <div className="option">
            <div className="new-circle"></div>
            <div className="option-description"><span>3</span> New </div>
          </div>
          <div className="option">
            <div className="ongoing-circle"></div>
            <div className="option-description"><span>3</span> Ongoing </div>
          </div>
          <div className="option">
            <div className="completed-circle"></div>
            <div className="option-description"><span>87</span> Completed </div>
          </div>
        </div>
        <CaseFilter />
      </div>
      <div className="logs">
        {props.data.map(user => {
            console.log(user);
            const date = new Date(user.startDate)
            const minutes = date.getMinutes();
            const hours = date.getHours() % 12;
            const ampm = date.getHours() > 11 ? 'PM': 'AM';
            return (
              <Log status={user.status} caseId={user.caseId}
              time={`${hours}:${minutes} ${ampm}`} location={user.address}/>
            )
          })}
      </div>
    </div>
  )
}

export default CallCenter;

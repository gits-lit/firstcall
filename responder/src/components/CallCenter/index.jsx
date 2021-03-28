import React, { useEffect, useState, useRef } from 'react';
import { Switch } from 'antd';
import anime from 'animejs';

import './style.scss';

import CaseFilter from './CaseFilter';
import Log from './Log';
import ResponderModal from '../ResponderModal'
import SearchBar from './SearchBar';

let animation;
const CallCenter = (props) => {
  const animationRef = React.useRef(null);
  const [filter, setFilter] = useState('All Cases');
  const [searchId, setSearchId] = useState('');
  const [initialAnimation, setInitialAnimation] = useState(true);
  const [completedCount, setCompleted] = useState(0);
  const [newCount, setNewCount] = useState(0);
  const [ongoingCount, setOngoingCount] = useState(0);
  const [toggleStatus, setToggleStatus] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      props.setAccepting(prevState => true);
      anime({
        targets: '.log-status',
        opacity: '1',
        translateY: [{value: 0, easing: 'easeInCubic'}, {value: -25, easing: 'easeOutCubic'}],
        direction: 'alternate',
        easing: 'easeInExpo',
        duration: 0,
        loop: false,
        autoplay: true
      });
      setTimeout(() => {
        setIsModalVisible(prevState => true);
      }, 1000);
    }, 500000)
  }, [])

  useEffect(() => {
    let completedStatus = 0;
    let newStatus = 0;
    let ongoingStatus = 0;

    for (let i = 0; i < props.data.length; i++) {
      if (props.data[i].status === '0' && props.accepting) {
        newStatus += 1;
      } else if (props.data[i].status === '1' || props.data[i].status === '2') {
        ongoingStatus += 1;
      } else {
        completedStatus += 1;
      }
    }
    setCompleted(completedStatus);
    setNewCount(newStatus);
    setOngoingCount(ongoingStatus);
  }, [props.data, props.accepting]);

  useEffect(() => {
    if (initialAnimation && props.data.length > 1) {
      console.log('initial')
      animation = anime({
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
      animation.finished.then(() => {
        setInitialAnimation(false);
      })
    } else {
      animationRef.current = anime({
        targets: '.log-status',
        opacity: '1',
        delay: anime.stagger(0, {start: 0}),
        translateY: [{value: 0, easing: 'easeInCubic'}, {value: -25, easing: 'easeOutCubic'}],
        direction: 'alternate',
        easing: 'easeInExpo',
        duration: 0 * props.data.length,
        loop: false,
        autoplay: true
      });
    }
  }, [props.data, filter, searchId])

  return (
    <div className="call-center">
      <div className="call-center-header">
        <h1 className="center-name">Call Center</h1>
        <div className="toggle-button">
          <Switch
            onChange={(e) => {
              setToggleStatus(!toggleStatus);
            }}/>
          <ResponderModal visibleModal={isModalVisible} seconds={5}
          setStartTakingInCalls={props.setStartTakingInCalls}
          setCall={props.setCall}
            setIsModalVisible={(visibleInput) => {
              setIsModalVisible(visibleInput);
            }}
            setToggleStatus={(toggleInput) => {
              setToggleStatus(toggleInput);
            }}/>
          <h2>Auto-Accept cases</h2>
        </div>
      </div>
      <SearchBar name="by Case ID"
        setSearchId={(searchIdInput) => {
          setSearchId(searchIdInput);
        }}
      />
      <div className="status-options">
        <div className="option-num">
          <div className="option">
            <div className="new-circle"></div>
            <div className="option-description"><span>{newCount}</span> New </div>
          </div>
          <div className="option">
            <div className="ongoing-circle"></div>
            <div className="option-description"><span>{ongoingCount}</span> Ongoing </div>
          </div>
          <div className="option">
            <div className="completed-circle"></div>
            <div className="option-description"><span>{completedCount}</span> Completed </div>
          </div>
        </div>
        <CaseFilter filter={filter} 
          setFilter={(filterInput) => {
            console.log(filterInput);
            setFilter(filterInput);
          }}
        />
      </div>
      <div
        className="logs"
        ref={animationRef}>
        {props.data.map(user => {
            const date = new Date(user.startDate)
            const minutes = date.getMinutes();
            const hours = date.getHours() % 12;
            const ampm = date.getHours() > 11 ? 'PM': 'AM';
            if (
              (!(user.status === '0' && !props.accepting)) &&
              (filter === 'All Cases' ||
              (filter === 'New' && user.status === '0') ||
              (filter === 'Ongoing' && user.status === '1') ||
              (filter === 'Ongoing' && user.status === '2') ||
              (filter === 'Completed' && user.status === '3')) &&
              user.caseId.toLowerCase().startsWith(searchId.toLowerCase())    
              ) {
                return (
                  <Log status={user.status} caseId={user.caseId}
                  setStartTakingInCalls={props.setStartTakingInCalls}
                  time={`${hours}:${minutes} ${ampm}`} location={user.address}/>
                )
            }
          })}
      </div>
    </div>
  )
}

export default CallCenter;

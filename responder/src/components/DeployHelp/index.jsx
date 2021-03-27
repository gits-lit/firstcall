import React, {useState} from 'react';

import HelpCarousel from './HelpCarousel';
import SearchBar from '../CallCenter/SearchBar';

import './style.scss';

const DeployHelp = () => {
  const [searchUnit, setSearchUnit] = useState('');
  const [unitType, setUnitType] = useState('Police');

  //temp carousel
  const temp = [{
    name:'Los Angeles Police Department',
    address:'2111 E 1st St, Los Angeles, CA 90033',
    type:'Police',
    'unit-img':'http://placekitten.com/200/300'
  },
  {
    name:'Los Angeles Police Department 2',
    address:'2111 E 1st St, Los Angeles, CA 90033',
    type:'Ambulance',
    'unit-img':'http://placekitten.com/200/300'
  },
  {
    name:'Los 1 Police Department',
    address:'2111 E 1st St, Los Angeles, CA 90033',
    type:'Police',
    'unit-img':'http://placekitten.com/200/300'
  },
  {
    name:'Ls2s Police Department',
    address:'2111 E 1st St, Los Angeles, CA 90033',
    type:'Police',
    'unit-img':'http://placekitten.com/200/300'
  }]

  return (
    <div className="deploy-help">
      <div className="route-options">
        <h1 className="deploy-header">Deploy Help</h1>
        <div className="option-num">
          <div className="requested-option">
            <div className="requested-circle"></div>
            <div className="option-description"><h1>{2}</h1><span>Requested</span></div>
          </div>
          <div className="option">
            <div className="enroute-circle"></div>
            <div className="option-description"><h1>{2}</h1><span>Enroute</span> </div>
          </div>
          <div className="option">
            <div className="onsight-circle"></div>
            <div className="option-description"><h1>{2}</h1><span>On-Site</span></div>
          </div>
        </div>
      </div>
      <SearchBar name="for Unit"
        setSearchId={(searchUnitInput) => {
          setSearchUnit(searchUnitInput);
        }}
      />
      <HelpCarousel unit={temp} searchValue={searchUnit}/>
    </div>
  )
}

export default DeployHelp;
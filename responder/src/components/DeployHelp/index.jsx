import React, {useState} from 'react';
import SearchBar from '../CallCenter/SearchBar';
import './style.scss';

const DeployHelp = () => {
  const [searchUnit, setSearchUnit] = useState('');

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
    </div>
  )
}

export default DeployHelp;
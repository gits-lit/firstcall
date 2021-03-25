<<<<<<< HEAD
import React from 'react';
import LogPage from './LogPage';

const HomePage = () => {
  return (
    <div>
      Home Page
      <LogPage />
=======
import React, {useState} from 'react';
import SideBar from '../components/SideBar'

const HomePage = () => {
  const [click, setClick] = useState('log');

  return (
    <div>
      <SideBar click={click}
        setClick={(clickInput) => {
          setClick(clickInput);
        }}
      />
      {
        click === 'log' ?
          <div>
            weee
          </div> 
        : click === 'dial' ?
          <div>
            test dial
          </div> 
        : click === 'stats' ?
          <div>
            test stats
          </div> :
        <></>
      }
>>>>>>> 25cf3783e39fbdaddd7003c6faa867cedf9979e0
    </div>
  )
}

export default HomePage;
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
    </div>
  )
}

export default HomePage;
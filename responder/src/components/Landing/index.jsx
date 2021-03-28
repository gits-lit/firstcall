import { Button } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';

import radiallogo from '../../assets/radiallogo.png';
import blueshapes from '../../assets/blueshapes.png';
import pinkshapes from '../../assets/pinkshapes.png';
import phone from '../../assets/phone.png';

import devpost from '../../assets/devpost.svg';
import github from '../../assets/github.svg';

const Landing = (props) => {
  return (
    <div className="Landing">
      <img src={radiallogo} alt="logo" className="radiallogo" />
      <img src={blueshapes} alt="blueshapes" className="blueshapes" />
      <img src={pinkshapes} alt="pinkshapes" className="pinkshapes" />
      <img src={phone} alt="phone" className="phone" />
      <div className="text">
        <h1>Improving your</h1>
        <h1>next 911 call</h1>
        <p>
          In the digital age, you are able view where the location of your uber
          but not your ambulance when you call for help. FirstCall is a
          multi-platform service for improving the next critical emergency.
        </p>
        <div className="buttons">
          <Link to="/">
            <Button className="start">Start Demo</Button>
          </Link>
          <Button className="mobile">Mobile Demo</Button>
        </div>
        <div className="links">
          <h3>Check out our links:</h3>
          <div className="link-row">
            <a href="https://devpost.com/software/firstcall" target="_blank">
              <Button className="devpost">
                <img src={devpost} alt="dev" style={{ marginRight: '12px' }} />
                Devpost
              </Button>
            </a>
            <a href="https://github.com/gits-lit/lahacks2021" target="_blank">
              <Button className="devpost">
                <img src={github} alt="dev" style={{ marginRight: '12px' }} />
                Github
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;

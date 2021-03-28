import { useHistory } from "react-router-dom";

import log from '../../assets/log.svg';
import dial from '../../assets/dial.svg';
import gear from '../../assets/gear.svg';
import stats from '../../assets/stats.svg';

import './style.scss';

const SideBar = (props) => {
  let history = useHistory();

  return (
    <div className="side-bar">
      <div className="tabs">
        <div
          className={props.click === 'stats' ? 'tab selected' : 'tab'}
          onClick={() => {
            history.push("/landing")
          }}
        >
          <div className="background"></div>
          <img src={stats} alt="logo" className="stats" />
        </div>
        <div
          className={props.click === 'log' ? 'tab selected' : 'tab'}
          onClick={() => {
            props.setClick('log');
          }}
        >
          <div className="background"></div>
          <img src={log} alt="logo" className="log" />
        </div>
        <div
          className={props.click === 'dial' ? 'tab selected' : 'tab'}
          onClick={() => {
            props.setClick('dial');
          }}
        >
          <div className="background"></div>
          <img src={dial} alt="logo" className="dial" />
        </div>
      </div>
      <div className="gear">
        <img src={gear} alt="logo" />
      </div>
    </div>
  );
};

export default SideBar;

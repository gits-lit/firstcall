import { Button } from 'antd';
import './style.scss';

const Heart = (props) => {
  const calcBPM = (BPM) => {
    if (BPM <= 50) {
      return 'Below Average';
    } else if (BPM > 50 && BPM <= 100) {
      return 'Average';
    } else if (BPM >= 101) {
      return 'Below Average';
    }
    else {
      return ''
    }
  };

  return (
    <div className="Heart">
      <h3 className="title">Record heart BPM</h3>
      <h4 className="sub-title">Hold to face</h4>

      <div className="row">
        <div className="bpm">
          <h4>
            <strong>{props.BPM}</strong>
          </h4>
          <p>BPM</p>
        </div>
        <h4 className="avg">{calcBPM(props.BPM)}</h4>
      </div>
      <Button type="primary" className="start">
        Start
      </Button>
    </div>
  );
};

export default Heart;

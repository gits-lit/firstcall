import { Button } from 'antd';
import './style.scss';

const Heart = (props) => {
  return (
    <div className="Heart">
      <h3 className="title">Record heart BPM</h3>
      <h4 className="sub-title">Hold to face</h4>

      <div className="row">
        <div className="bpm">
          <h4>
            <strong>120</strong>
          </h4>
          <p>BPM</p>
        </div>
        <h4 className="avg">Above Average</h4>
      </div>
      <Button type="primary" className="start">Start</Button>
    </div>
  );
};

export default Heart;

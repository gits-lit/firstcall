import './style.scss';

const Heart = (props) => {
  return (
    <div className="Heart">
      <h3 className="title">Record heart BPM</h3>
      <h4 className="sub-title">Hold to face</h4>

      <div className="row">
        <div className="bpm">
          <h4>
            <strong>N/A</strong>
          </h4>
          <p>Heart Rate</p>
        </div>
        <h4>Above Average</h4>
      </div>
    </div>
  );
};

export default Heart;

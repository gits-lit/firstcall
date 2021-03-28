import Camera from '../components/Camera';

const CameraPage = (props) => {
  return (
    <div className="CameraPage">
      <Camera setClick={props.setClick} />
    </div>
  );
};

export default CameraPage;

import './style.scss';

const ImagesTab = (props) => {

  return (
    <div className="images-tab">
      <h3>Image Analysis</h3>
      {props.image.map((image) => {
        return (
          <div className="image">
            <div className="image-name">{image.name}</div>
            <div className="image-score">{Math.floor(image.score * 100)} %</div>
          </div>
        )
      })}
    </div>
  )
}

export default ImagesTab;
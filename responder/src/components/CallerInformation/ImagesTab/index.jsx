import { useState, useEffect, useRef } from 'react';

const ImagesTab = (props) => {

  return (
    <div className="images-tab">
      {props.image.map((image) => {
        return (
          <div className="image">
            <div>{image.name}</div>
            <div>{image.score}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ImagesTab;
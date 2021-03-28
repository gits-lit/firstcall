import { useState, useEffect, useRef } from 'react';
import './style.scss';

const Images = (props) => {
  const mainRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    props.socket.on('image', (data) => {
      console.log(data);
      mainRef.current.style.display='block';
      if (imageRef && imageRef.current) {
        imageRef.current.src = data.text;
      }
    })
  }, []);

  return (
    <div ref={mainRef }className="images">
      <img ref={imageRef} />
    </div>
  )
}

export default Images;
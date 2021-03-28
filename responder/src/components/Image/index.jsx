import { useState, useEffect, useRef } from 'react';
import './style.scss';

const Images = (props) => {
  const mainRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    props.socket.on('image', async (data) => {
      console.log('here');
      console.log(data);
      mainRef.current.style.display='block';
      if (imageRef && imageRef.current) {
        imageRef.current.src = data.text;
      }

      const base64 = data.text;
      // GCP 
      const payload = {
        requests: [
          {
            image: {
              "content": base64.replace("data:image/jpeg;base64,", "")
            },
            features: [
              {
                "maxResults": 5,
                "type": "OBJECT_LOCALIZATION"
              },
            ]
          }
        ]
      }

      const response = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.REACT_APP_API_KEY}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Content-Length": base64.replace("data:image/jpeg;base64,", "").length
        },
        body: JSON.stringify(payload),
      });

      const gcpdata = await response.json();
      if (gcpdata.responses && gcpdata.responses[0] && gcpdata.responses[0].localizedObjectAnnotations) {
        props.setImage(prev => gcpdata.responses[0].localizedObjectAnnotations);
        console.log(gcpdata.responses[0].localizedObjectAnnotations)
      }
    })
  }, []);

  return (
    <div ref={mainRef }className="images">
      <img ref={imageRef} />
      <div className="image-text-box">Image Received!</div>
    </div>
  )
}

export default Images;
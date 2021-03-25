import { useState } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import CustomMarker from './CustomMarker';
import './style.scss';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw',
    animationOptions: {
      essential: true
    },
    dragRotate: false,
    attributionControl: false,
    //touchZoomRotate={false},
    //dragPan: false,
    interactive: false,
});

const MapComponent = (props) => {
  const height = props.dial ? '30vh' : '91.5vh';
  const bottom = props.dial ? '53vh' : '0vh';
  // 45.75 - (8.5 / 2)
  const bottomtwo = props.dial ? '-39.5vh' : '0vh';
  const radius = props.dial ? '5px' : '0';
  const right = props.dial ? '2vw' : '0';

  const onMapLoad = (map) => {
    window.map = map;
    map.scrollZoom.disable();
    //loadLocations(map);
    //loadMarkers(map);
    console.log(window.innerWidth * 0.6);
  };

  const onMapClick = (map) => {
    window.map = map;
  }

  return (
    <div style={{
      position: 'absolute',
      right: right,
      height: height,
      transition: '1s',
      overflow: 'hidden',
      width: '60vw',
      bottom: bottom,
      borderRadius: radius
    }}>
    <Map
      antialias={false}
      containerStyle={{
        borderRadius: radius,
        bottom: bottomtwo,
        height: '91.5vh',
        right: '0',
        overflow: 'hidden',
        position: 'absolute',
        transition: '1s',
        width: '60vw'
      }}
      center={[-117.06651266267941, 32.76570649214452]}
      flyToOptions={{
        speed: 0
      }}
      onClick={onMapClick}
      onStyleLoad={onMapLoad}
      pitch = {[0]}
      style="mapbox://styles/mapbox/light-v10"

      zoom = {[13]}
    >
      {props.markerVisibility &&
      <Marker
        coordinates={[-117.06651266267941, 32.76570649214452]}
        anchor="bottom"
        offset={[400, -window.innerHeight * .915]}
        onClick={() => {
          props.setCall(-117.06651266267941, 32.76570649214452);
        }}
      >
        <CustomMarker
          id="9231DS"
          status="Completed"
        />
      </Marker>
      }
    </Map>
    </div>
  );
}

export default MapComponent;
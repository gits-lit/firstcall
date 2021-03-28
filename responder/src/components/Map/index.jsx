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
  const bottom = props.dial ? '51.5vh' : '0vh';
  // 45.75 - (8.5 / 2)
  const bottomtwo = props.dial ? '-39.5vh' : '0vh';
  const radius = props.dial ? '5px' : '0';
  const right = props.dial ? '2vw' : '0';
  const width = props.dial ? '63vw' : '60vw';

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
      width: width,
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
        width: '63vw'
      }}
      center={[-117.2276424619609, 32.862009432372616]}
      flyToOptions={{
        speed: 0
      }}
      onClick={onMapClick}
      onStyleLoad={onMapLoad}
      pitch = {[0]}
      style="mapbox://styles/mapbox/light-v10"

      zoom = {[13]}
    >
      {
        props.data.map(user => {
          if (!(user.status === '0' && !props.accepting)) {
          return (
            props.markerVisibility && 
            <Marker
            coordinates={[user.long, user.lat]}
            anchor="bottom"
            offset={[400, -window.innerHeight * .915]}
            onClick={() => {
              console.log('CALLING')
              props.setCall(user.long, user.lat);
            }}
          >
            <CustomMarker
              id={user.caseId}
              status={user.status}
            />
          </Marker>
          )
          }})
      }
    </Map>
    </div>
  );
}

export default MapComponent;
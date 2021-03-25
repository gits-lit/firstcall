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
  const leftMargin = props.sideBarVis ? '15vw' : '0';

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
    <Map
      antialias={false}
      containerStyle={{
        bottom: '0',
        height: '91.5vh',
        marginLeft: '35vw',
        overflow: 'hidden',
        position: 'absolute',
        transition: '.5s',
        width: '60vw'
      }}
      center={[-117.06651266267941, 32.76570649214452]}
      flyToOptions={{
        speed: 0
      }}
      onClick={onMapClick}
      onStyleLoad={onMapLoad}
      pitch = {props.pitch}
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
  );
}

export default MapComponent;
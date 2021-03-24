import React from 'react';
import {Threebox} from 'threebox-plugin';
import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw'
});

const MapComponent = (props) => {
  const leftMargin = props.sideBarVis ? '15vw' : '0';
  console.log(props.sideBarVis);

  let locations = {};
  const mapLoad = map => {
    window.map = map;
    setTimeout(2000);
  };

  return (
    <Map
      antialias={true}
      containerStyle={{
        height: '105vh',
        width: '100%',
        marginLeft: leftMargin,
        transition: '.5s',
        overflow: 'hidden'
      }}
      center={[-117.06651266267941, 32.76570649214452]}
      flyToOptions={{
        speed: 0
      }}
      onClick={props.mapClick}
      onStyleLoad={mapLoad}
      pitch = {[60]}
      style="mapbox://styles/mapbox/light-v10"
      zoom = {[16]}
    >
    </Map>
  );
}

export default MapComponent;

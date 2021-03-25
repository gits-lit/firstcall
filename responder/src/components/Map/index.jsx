import ReactMapboxGl, { Marker } from 'react-mapbox-gl';

import CustomMarker from './CustomMarker';
import { loadLocations } from './utils.js';
import './style.scss';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw'
});

const MapComponent = (props) => {
  const leftMargin = props.sideBarVis ? '15vw' : '0';

  const onMapLoad = (map) => {
    window.map = map;
    map.scrollZoom.disable();
    loadLocations(map);
    //loadMarkers(map);
    console.log(window.innerWidth * 0.6);
  };

  const onMapClick = (map) => {
    
  }

  return (
    <Map
      antialias={true}
      containerStyle={{
        bottom: '0',
        height: '91.5vh',
        marginLeft: '40vw',
        overflow: 'hidden',
        position: 'absolute',
        transition: '.5s',
        width: '60%'
      }}
      center={[-117.06651266267941, 32.76570649214452]}
      flyToOptions={{
        speed: 0
      }}
      onClick={onMapClick}
      onStyleLoad={onMapLoad}
      pitch = {[0]}
      style="mapbox://styles/mapbox/light-v10"
      zoom = {[16]}
    >
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
    </Map>
  );
}

export default MapComponent;
import React from 'react';
import {Threebox} from 'threebox-plugin';
import ReactMapboxGl from 'react-mapbox-gl';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZW1pbmd1eWVuIiwiYSI6ImNrOGI2ZjRyODA1aHEzZG93cmFxaHR5d2IifQ.x8v_uFbdBanYgRtoKCGIOw'
});

/**
 * Loads the 3D model
**/
const loadLocations = (map) => {
  map.addLayer({
   id: 'bananya',
   type: 'custom',
   renderingMode: '3d',
   onAdd: function (map, mbxContext) {

     window.tb = new Threebox(
       map,
       mbxContext,
       { defaultLights: true, enableDraggingObjects: true, enableSelectingObjects:true }
     );

     var options = {
       obj: '/bananya_birbo/scene.gltf',
       type: 'gltf',
       scale: 40,
       units: 'meters',
       anchor: 'center',
       rotation: { x: 90, y: 180, z: 0 } //default rotation
     }

     window.tb.loadObj(options, function (model) {
       const cat = model.setCoords([-117.06651266267941, 32.76570649214452]);
       console.log("Nya~ nya~ nya~ pls end me");
       window.tb.add(cat);
     })

   },
   render: function (gl, matrix) {
     window.tb.update();
   }
 });
}

/**
 * The actual component
**/
const MapComponent = (props) => {
  const leftMargin = props.sideBarVis ? '15vw' : '0';
  console.log("Loading Map...");

  let locations = {};
  const mapLoad = map => {
    setTimeout(() => {
      window.map = map;
      loadLocations(map);
    }, 2000);
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

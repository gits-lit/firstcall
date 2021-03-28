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
        obj: '/map_pin/scene.gltf',
        type: 'gltf',
        scale: 0,
        units: 'meters',
        anchor: 'center',
        rotation: { x: 90, y: 180, z: 0 } //default rotation
      }
 
      window.tb.loadObj(options, function (model) {
        const location = model.setCoords([-117.2349308177206, 32.881177635133476]);
        window.tb.add(location);
 
        let rotation = 0;
        let scaleX = 0;
        let scaleY = 0;
        let scaleZ = 0;
        let notYet = true;
        function animate() {
    
          setTimeout( function() {
    
            requestAnimationFrame( animate );
    
          }, 1000 / 20 );
          location.setRotation({x:0, y:0, z: rotation += 10});
 
          if (scaleX < 0.15 && scaleY < 0.15 && scaleZ < 0.15) {
           location.scale.set(
             scaleX += 0.006,
             scaleY += 0.006,
             scaleZ += 0.006
           );
          } else {
            location.scale.set(0.15, 0.15, 0.15);
            if (notYet) {
              //callback();
              notYet = false;
            }
          }
        }
        animate();
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
      center={[-117.2349308177206, 32.881177635133476]}
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

import {Threebox} from 'threebox-plugin';
import { TweenMax } from 'gsap';

/**
 * Loads the 3D model
**/
export const loadLocation = (map, lng, lat, callback) => {
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
       const location = model.setCoords([lng, lat]);
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
             callback();
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

export const removeLocation = (map, callback) => {
  //map.removeLayer('bananya');
  //map.removeSource('bananya');
  setTimeout(() => {
    callback();
  }, 500);
}
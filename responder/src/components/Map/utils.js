import {Threebox} from 'threebox-plugin';

/**
 * Loads the 3D model
**/
export const loadLocations = (map) => {
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
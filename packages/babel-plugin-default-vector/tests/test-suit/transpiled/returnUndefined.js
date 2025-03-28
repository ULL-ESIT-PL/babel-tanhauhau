const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let obj = new DefaultObject({}, undefined, {
  checkInside: false
});
// Eliminar una propiedad que no existe
delete obj.nonExistentProp;
console.log(obj.nonExistentProp); // undefined
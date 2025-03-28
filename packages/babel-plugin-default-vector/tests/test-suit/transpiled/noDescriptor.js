const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let obj = new DefaultObject({
  key: "value"
});
console.log(Object.getOwnPropertyDescriptor(obj, "key")); // descriptor de propiedad con configurable, enumerable, value y writable
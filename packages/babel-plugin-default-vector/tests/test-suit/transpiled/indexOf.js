const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let arr = new DefaultVector(['apple', 'banana', 'cherry'], i => `default ${i}`);
console.log(arr.indexOf('banana')); // 1
console.log(arr.indexOf('orange')); // -1 (no encontrado)
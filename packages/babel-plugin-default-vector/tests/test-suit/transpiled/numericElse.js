const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let array = new DefaultVector([1, 2, undefined], 10);
console.log(array[6]); // 10
console.log(array[2]); // 10
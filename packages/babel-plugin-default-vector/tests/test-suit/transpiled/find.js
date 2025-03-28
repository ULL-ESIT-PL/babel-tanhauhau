const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let arr = new DefaultVector([3, 5, 7, 9], i => 0);
let found = arr.find(x => x > 6); // Primer valor > 6 es 7
console.log(found);
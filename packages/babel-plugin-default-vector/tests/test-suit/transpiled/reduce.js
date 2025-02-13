const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let arr = new DefaultVector([1, 2, 3, 4], i => 0);
let sum = arr.reduce((acc, x) => acc + x, 0); // 1+2+3+4 = 10

console.log(sum);
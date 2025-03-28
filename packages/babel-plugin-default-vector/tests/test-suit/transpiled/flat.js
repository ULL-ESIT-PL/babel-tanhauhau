const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let nested = new DefaultVector([[1, 2], [3, 4]], i => i * 100);
let flatArr = nested.flat();
console.log(flatArr[4]); // 400 (else)
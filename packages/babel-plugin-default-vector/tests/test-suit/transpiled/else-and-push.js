const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let a = new DefaultVector([1, 2, 3], x => x * x);
console.log(a[3]); // 9
a.push(4);
console.log(a[3]); // 4
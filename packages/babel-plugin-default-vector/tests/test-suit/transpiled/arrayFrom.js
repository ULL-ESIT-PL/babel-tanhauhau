const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let array = new DefaultVector([1, 2, 3], x => x * x);
let anotherInstance = Array.from(array);
console.log(anotherInstance); // [ 1, 2, 3 ]
console.log(anotherInstance[3]); // undefined
console.log(array[3]); // 9
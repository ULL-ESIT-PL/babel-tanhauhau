const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let arr1 = new DefaultVector([1, 2], i => `default ${i}`);
let arr2 = new DefaultVector([3, 4], i => `default 2 ${i}`);
let concated = arr1.concat(arr2); // Concatena los dos DefaultVector

console.log(concated[0]); // 1

console.log(concated[1]); // 2

console.log(concated[2]); // 3

console.log(concated[3]); // 4

console.log(concated[4]); // fuera de rango -> "default 4"
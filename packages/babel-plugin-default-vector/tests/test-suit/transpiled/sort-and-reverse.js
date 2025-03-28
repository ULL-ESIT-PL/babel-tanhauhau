const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let arr = new DefaultVector([5, 2, 8], i => i * 10);
let sorted = arr.sort((a, b) => a - b);
console.log(sorted[0]); // 2
console.log(sorted[3]); // 30
console.log(sorted[4]); // 40 

let reversed = arr.reverse();
console.log(reversed[0]); // 8
console.log(reversed[3]); // 30
console.log(reversed[4]); // 40
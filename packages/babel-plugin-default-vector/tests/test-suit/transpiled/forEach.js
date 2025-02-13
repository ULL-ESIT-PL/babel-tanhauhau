const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let arr = new DefaultVector([2, 4, 6], i => `default ${i}`);
let result = "";
arr.forEach(x => {
  result += x;
});
console.log(result); // "246"
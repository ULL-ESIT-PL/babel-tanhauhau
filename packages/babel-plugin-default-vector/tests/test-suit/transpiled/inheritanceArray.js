const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let fn = x => x * x;
let padre = new DefaultVector([1, 2, 3], fn);
let arraySon = Object.create(padre);
debugger;
console.log(arraySon); // DefaultVector {}
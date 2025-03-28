const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let newVec = new DefaultVector([1, 2, 3], (i, vec) => `Index ${i} out of bounds in ${JSON.stringify(vec)}`, false, undefined, true);
console.log(newVec[5]); // "Index 5 out of bounds in [1,2,3]"
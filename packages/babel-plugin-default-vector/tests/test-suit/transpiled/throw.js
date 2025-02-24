const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let array = new DefaultVector([10, 15, 30], checkInside = true);
array.setElseExpression(i => {
  throw new Error(`Se ha intentado acceder a la posición: ${i} que no existe`);
});

try {
  console.log(array[0]);
  console.log(array[1]);
  console.log(array[2]);
  console.log(array[3]);
} catch (e) {
  console.log(e.message);
}
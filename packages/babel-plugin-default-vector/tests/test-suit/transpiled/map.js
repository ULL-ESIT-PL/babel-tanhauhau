const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let arr = new DefaultVector([1, 2, 3], i => i * 10);
let mapped = arr.map(x => x * 2); // [2, 4, 6] con el else propagado
console.log(mapped[0]); // 2
console.log(mapped[1]); // 4
console.log(mapped[2]); // 6
console.log(mapped[3]); // fuera de rango → 3*10 = 30
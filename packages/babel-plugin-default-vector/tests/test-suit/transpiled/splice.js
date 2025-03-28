const {
  DefaultVector: DefaultVector
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let arr = new DefaultVector(['a', 'b', 'c', 'd'], i => `default ${i}`);
let removed = arr.splice(1, 2, 'x', 'y'); // Elimina 'b' y 'c', inserta 'x' y 'y'
console.log(removed.length); // 2 (los elementos eliminados)
console.log(removed[0]); // "b"
console.log(removed[1]); // "c"

// El array resultante es: ['a', 'x', 'y', 'd']
console.log(arr.length); // 4
console.log(arr[0]); // "a"
console.log(arr[1]); // "x"
console.log(arr[2]); // "y"
console.log(arr[3]); // "d"
console.log(arr[4]); // fuera de rango → "default 4"
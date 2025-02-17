const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let defaultFn = key => key + " missing";

let obj = new DefaultObject({
  x: 10,
  y: undefined,
  z: "Zeta"
}, defaultFn, true);
console.log(Object.keys(obj).join(',')); // Se espera: "x,y,z"

console.log(Object.values(obj).join(',')); // Al acceder a "y" (que es undefined) se aplica el default: "10,y missing,Zeta"

console.log(Object.entries(obj).map(pair => pair.join(':')).join(',')); // Se espera: "x:10,y:y missing,z:Zeta"

console.log(obj.hasOwnProperty('x')); // true

console.log(obj.hasOwnProperty('y')); // true (existe, aunque su valor sea undefined)

console.log(obj.hasOwnProperty('w')); // false
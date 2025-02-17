const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let defaultFn = key => key + " undefined";

let obj = new DefaultObject({
  a: 1,
  b: 2
}, defaultFn, true);
console.log(obj.a); // 1

obj.a = 10;
console.log(obj.a); // 10
// Agregamos nueva propiedad

obj.c = 3;
console.log(obj.c); // 3
// Borramos la propiedad 'b'

delete obj.b;
console.log(obj.b); // "b undefined" (se invoca el default)
// Definición de propiedad con Object.defineProperty

Object.defineProperty(obj, 'd', {
  value: 4,
  writable: true,
  enumerable: true
});
console.log(obj.d); // 4
// Actualizamos la propiedad 'd'

obj.d = 40;
console.log(obj.d); // 40
// Usando Object.assign (resultado es un objeto normal sin comportamiento default)

let newObj = Object.assign({}, obj);
console.log(newObj.a); // 10

console.log(newObj.b); // undefined (propiedad borrada)

console.log(newObj.c); // 3

console.log(newObj.d); // 40
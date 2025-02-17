const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let defaultFn = key => key + " not available";

let obj = new DefaultObject({
  a: "A",
  b: undefined
}, defaultFn, true); // Agregamos propiedad no enumerable

Object.defineProperty(obj, 'hidden', {
  value: "secret",
  enumerable: false
}); // Agregamos una propiedad con símbolo

const sym = Symbol('sym');
obj[sym] = "symbol value"; // Recorremos propiedades con for...in (solo las enumerables)

let inKeys = "";

for (let key in obj) {
  inKeys += key + ",";
}

console.log(inKeys.slice(0, inKeys.length - 1)); // "a,b"
// Obtenemos todas las propiedades (incluyendo no enumerables)

console.log(Object.getOwnPropertyNames(obj).join(',')); // Se espera: "a,b,hidden"
// Obtenemos las propiedades símbolo

console.log(Object.getOwnPropertySymbols(obj).map(s => s.toString()).join(',')); // Se espera: "Symbol(sym)"

console.log(obj.hidden); // "secret" (acceso directo a propiedad no enumerable)

console.log(obj.nonExistent); // "nonExistent not available" (propiedad inexistente)
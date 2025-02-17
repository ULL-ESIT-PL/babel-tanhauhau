const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let defaultFn = key => key + " missing";

let parentObj = new DefaultObject({
  p: "parent",
  q: undefined
}, defaultFn, true);
let childObj = Object.create(parentObj);
childObj.c = "child";
console.log(childObj.c); // "child" (propiedad propia)

console.log(childObj.p); // "parent" (heredada)

console.log(childObj.q); // "q missing" (heredada pero undefined en parent)

console.log(childObj.r); // "r missing" (no existe en child ni en parent)
// Sobrescribir propiedad heredada

childObj.p = "child parent";
console.log(childObj.p); // "child parent"
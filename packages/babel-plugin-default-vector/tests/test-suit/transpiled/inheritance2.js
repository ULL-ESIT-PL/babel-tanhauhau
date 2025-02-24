const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");

let defaultFn = key => key + " missing";

let grandParentObj = new DefaultObject({
  gp: "Me"
}, defaultFn, true);
let parentObj = Object.create(grandParentObj);
parentObj.p = "Me";
parentObj.gp = "parent";
let childObj = Object.create(parentObj);
childObj.c = "Me";
childObj.p = "parent";
childObj.gp = "grand parent";
console.log(childObj.c); // "Me" (propiedad propia)

console.log(childObj.p); // "parent" (heredada)

console.log(childObj.gp); // "grand parent" (heredada)

console.log(parentObj.gp); // "parent"

console.log(parentObj.p); // "Me"

console.log(grandParentObj.gp); // "Me"

console.log(grandParentObj.hasOwnProperty('p')); // false

console.log(grandParentObj.hasOwnProperty('c')); // false
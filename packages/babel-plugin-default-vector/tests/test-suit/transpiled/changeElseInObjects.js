const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let elsefn = x => {
  throw new Error(`Intento de acceso a un elemento inexistente: ${x}`);
};
let object = new DefaultObject({
  "a": 1,
  "b": 2
}, elsefn);
try {
  console.log(object.c);
} catch (e) {
  console.log(e.message); // Intento de acceso a un elemento inexistente: c
}
let anotherfn = x => {
  return x;
};
object.setElseExpression(anotherfn);
console.log(object.estoEsOtroAcceso); // c
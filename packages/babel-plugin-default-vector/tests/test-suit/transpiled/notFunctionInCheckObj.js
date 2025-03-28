const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
let fn = x => {
  return x;
};
let obj = new DefaultObject({
  "a": 1,
  "b": 2
}, fn);
try {
  obj.setCheckfn("hola");
} catch (e) {
  console.log(e.message); // checkfn must be a function
}
const {
  DefaultObject: DefaultObject
} = require("/Users/adrian/Desktop/Clases/Cuarto/segundo_cuatri/TFG/babel-tanhauhau/packages/babel-plugin-default-vector/src/support.js");
defaultFn = (key, obj) => obj ? `Missing ${key} in ${JSON.stringify(obj)}` : `Missing ${key}`;
let newObj = new DefaultObject({
  a: 1
}, defaultFn, {
  checkInside: true
});
console.log(newObj.b); // "Missing b in {\"a\":1}"